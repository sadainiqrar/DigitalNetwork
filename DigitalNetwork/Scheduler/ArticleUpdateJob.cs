using System;
using Quartz;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigitalNetwork.Models;
using DigitalNetwork.Controllers;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

namespace DigitalNetwork.Scheduler
{
    public class ArticleUpdateJob : IJob
    {
     
        List<ArticleModel> siteList;
        List<get_admin_articles_Result> dbList;


        public void Execute(IJobExecutionContext context)
        {
            DateTime date = DateTime.Now;
            deleteExtra();
            insertNew();
            DateTime date2 = DateTime.Now;
        }


        private void insertNew()
        {
           int count = 0;
            foreach (ArticleModel post in siteList)
            {
                try
                {
                    dataCon.DB.db.add_article(post.aId, post.aUrl, false, post.title, post.excerpt, post.featuredImage,post.modifiedDate, "http://trumpgossiptoday.com");
                    count++;
                }
                catch (Exception e)
                {
                    count++;
                }
            }
        }
        private void deleteExtra()
        {
            
            dbList = dbArticles();
            siteList = makeArticleList();

            foreach (get_admin_articles_Result dblistItem in dbList)
            {
                if (!siteList.Contains(checkElement(dblistItem.a_id, dblistItem.site_url,siteList)))
                {
                    dataCon.DB.db.delete_article(dblistItem.serial_no);
                }
                if (siteList.Contains(checkElement(dblistItem.a_id, dblistItem.site_url, siteList)))
                {
                    ArticleModel post = checkElement(dblistItem.a_id, dblistItem.site_url, siteList);
                    dataCon.DB.db.update_article_data(dblistItem.serial_no, post.aUrl, post.title, post.excerpt, post.featuredImage, post.modifiedDate );
                }
            }
        }
        private ArticleModel checkElement(int aid,string site_url, List<ArticleModel> artList)
        {
            foreach(ArticleModel a in artList)
            {
                if((a.aId == aid) && (a.site_url.Equals(site_url)))
                {
                    return a;
                }
            }
            return new ArticleModel();
        }
        private List<get_admin_articles_Result> dbArticles()
        {
            List<get_admin_articles_Result> dbArticles = new List<get_admin_articles_Result>();
            foreach(get_admin_articles_Result dbPost in getDBArticles())
            {
                dbArticles.Add(dbPost);
            }
            return dbArticles;
        }

        private IEnumerable<get_admin_articles_Result> getDBArticles()
        {

            return dataCon.DB.db.get_admin_articles("zuraiz.com", "url4.com");
        }
        private List<ArticleModel> makeArticleList()
        {
            List<ArticleModel> articles = new List<ArticleModel>();
            string url = "http://trumpgossiptoday.com";
            JArray posts = callBack(url + "/wp-json/wp/v2/posts");

            foreach (JObject post in posts)
            {
                ArticleModel article = new ArticleModel();
                article.site_url = url;
                article.aId = post.SelectToken("id").Value<int>();
                article.title = post.SelectToken("title.rendered").Value<string>();
                article.excerpt = post.SelectToken("excerpt.rendered").Value<string>();
                article.modifiedDate = post.SelectToken("modified").Value<DateTime>();
                article.aUrl = post.SelectToken("link").Value<string>();
                try { 
                    string image_post_url = post.SelectToken("_links.wp:featuredmedia[0].href").Value<string>();
                    JObject images = ObjectPaging(image_post_url);
                    article.featuredImage = images.SelectToken("guid.rendered").Value<string>();
                }
                catch(Exception e)
                {
                    article.featuredImage = "";
                }
                articles.Add(article);
            }
            return articles;
        }


        private JArray callBack(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url + "?per_page=100");
            request.Method = "GET";
            request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;

            try
            {
                JArray final = new JArray();
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                string tmp = response.Headers.Get("X-WP-TotalPages");
                int pages = Int32.Parse(tmp);
                for (int i = 1; i <= pages; i++)
                {
                    final = new JArray(final.Union(paging(url + "?per_page=100&page=" + i)));
                }

                return final;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        private JArray paging(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;


            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                string content = string.Empty;
                using (Stream stream = response.GetResponseStream())
                {
                    using (StreamReader sr = new StreamReader(stream))
                    {
                        content = sr.ReadToEnd();
                    }
                }
                var releases = JArray.Parse(content);
                return releases;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        private JObject ObjectPaging(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;


            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                string content = string.Empty;
                using (Stream stream = response.GetResponseStream())
                {
                    using (StreamReader sr = new StreamReader(stream))
                    {
                        content = sr.ReadToEnd();
                    }
                }
                var releases = JObject.Parse(content);
                return releases;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}