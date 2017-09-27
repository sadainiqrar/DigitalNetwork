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
                    dataCon.DB.db.add_article(post.aId, post.aUrl, false, "url4.com");
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

            foreach (get_admin_articles_Result listItem in dbList)
            {
                if(!siteList.Contains(checkElement(listItem.a_id,siteList)))
                {
                    dataCon.DB.db.delete_article(listItem.a_id);
                }
            }
        }
        private ArticleModel checkElement(int aid, List<ArticleModel> artList)
        {
            foreach(ArticleModel a in artList)
            {
                if(a.aId == aid)
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
            JArray posts = callBack("http://trumpgossiptoday.com/wp-json/wp/v2/posts");

            foreach (JObject post in posts)
            {
                ArticleModel article = new ArticleModel();
                article.aId = post.SelectToken("id").Value<int>();
                article.title = "empty";
                article.excerpt = "empty";
                article.modifiedDate = DateTime.Now;
                article.aUrl = post.SelectToken("link").Value<string>();
                article.featuredImage = "empty";
             
            
   

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
    }
}