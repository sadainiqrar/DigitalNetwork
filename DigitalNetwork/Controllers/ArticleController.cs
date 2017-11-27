using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Scheduler;
using System.IO;
using Newtonsoft.Json.Linq;
using DigitalNetwork.Models;
using DigitalNetwork.DataModel;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DigitalNetwork.Controllers
{
    public class ArticleController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();

        [HttpGet]
        [Route("api/admin/articles")]
        public IEnumerable<get_admin_articles_Result> Geti()
        {

            return db.get_admin_articles("zuraiz.com", "http://trumpgossiptoday.com");


        }



        [HttpPost]
        [Route("api/admin/articles/{id}")]
        public IEnumerable<get_admin_single_article_Result> PostSingleArticle(int id,[FromBody] AdminSite adsite)
        {

            getArticleBySerial_Result article = db.getArticleBySerial(id).ElementAt<getArticleBySerial_Result>(0);

            return db.get_admin_single_article(article.a_id, adsite.email, article.site_url);

        }



        [HttpPost]
        [Route("api/admin/articles/{id}/update")]
        public bool updateSingleArticle(int id)
        {
            getArticleBySerial_Result article = db.getArticleBySerial(id).ElementAt< getArticleBySerial_Result>(0);
            int result = db.update_articles(!article.status, id);
            article = db.getArticleBySerial(id).ElementAt<getArticleBySerial_Result>(0);
            return article.status;

        }



        [HttpGet]
        [Route("api/user/article/{serial}")]
        public getArticleBySerial_Result GetSingleArticle(int serial)
        {
            return db.getArticleBySerial(serial).FirstOrDefault<getArticleBySerial_Result>();

        }


        [HttpPost]
        [Route("api/user/articles")]
        public IEnumerable<get_Articles> PostArticles([FromBody] user_article_input article)
        {
            List<get_articles_Result> articleList = new List<get_articles_Result>();
            List<get_Articles> finalArticleList = new List<get_Articles>();

            using (var articles = db.get_articles(article.uid, article.category, article.sub_category))
            {
                articleList = articles.ToList<get_articles_Result>();
            }
            foreach(var item in articleList)
            {
                get_Articles post = new get_Articles();
                post.serial_no = item.serial_no;
                post.a_id = item.a_id;
                post.title = item.title;
                post.site_url = item.site_url;
                post.photo_url = item.photo_url;
                post.modified_date = item.modified_date;
                post.category = item.category;
                post.url = item.url;
                post.summary = item.summary;
                post.custom = item.custom;
                post.copied = item.copied;
                post.shared = item.shared;
                post.sub_category = item.sub_category;
                try
                {
                    using (var count = db.get_shared_article_serial(item.serial_no))
                    {
                        post.shares = count.First<int?>();
                    }

                }

                catch (Exception ex)
                {
                    post.shares = -1;
                }
                post.views = "0";
                finalArticleList.Add(post);
            }
            return finalArticleList;
         
        }

        [HttpPost]
        [Route("api/user/shared_articles")]
        public IEnumerable<get_Articles> Post_Shared_Articles([FromBody] user_article_input article)
        {

            List<get_shared_article_Result> articleList = new List<get_shared_article_Result>();
            List<get_Articles> finalArticleList = new List<get_Articles>();

            using (var articles = db.get_shared_article(article.uid, article.category, article.sub_category))
            {
                articleList = articles.ToList<get_shared_article_Result>();
            }
            foreach (var item in articleList)
            {
                get_Articles post = new get_Articles();
                post.serial_no = item.serial_no.GetValueOrDefault();
                post.a_id = item.a_id.GetValueOrDefault();
                post.title = item.title;
                post.site_url = item.site_url;
                post.photo_url = item.photo_url;
                post.modified_date = item.modified_date.GetValueOrDefault();
                post.category = item.category;
                post.url = item.url;
                post.summary = item.summary;
                post.custom = item.custom.GetValueOrDefault();
                post.copied = item.copied;
                post.shared = item.shared;
                post.sub_category = item.sub_category;
                post.shares = 0;
                post.views = "0";
                finalArticleList.Add(post);
            }
            return finalArticleList;
        }


        [HttpPut]
        [Route("api/user/insert/shared_article")]
        public int Put_Shared_Articles([FromBody] User_Articles article)
        {

            return db.add_shared_article(article.uid, article.serial_no, article.copied,article.shared);
        }

        [HttpPut]
        [Route("api/user/update/shared_article")]
        public int Update_Shared_Articles([FromBody] User_Articles article)
        {

            return db.update_shared_articles(article.uid, article.serial_no, article.shared, article.copied);
        }


        [HttpPut]
        [Route("api/admin/add/article")]
        public int Put_Article([FromBody] Article article)
        {

            return db.add_article(article.a_id, article.url, article.status, article.title, article.summary, article.photo_url, article.modified_date, article.url, article.category, article.sub_category,article.custom);
        }

        
        [NonAction]
        public string admin_gid(string url, DateTime publishDate, string a_url)
        {
            get_admin_gid_Result res;
            using (var data = db.get_admin_gid(url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }
                Authorization auth = new Authorization(res.Email);
                var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
                result.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url);
                var final = result.Execute();
                int count = (int)final.TotalResults;
                if (count != 0)
                {
                    IList<string> l = final.Rows[0];
                    return l[0];
                }
                return "" + 1;
            
        }

        [NonAction]
        public string convertDate(DateTime date)
        {
            var day = date.Day<10? "0" + date.Day.ToString() : date.Day.ToString();
            var month = date.Month<10 ? "0" + date.Month.ToString() : date.Month.ToString(); ;
            var year = date.Year;
            return year + "-" + month + "-" + day;
        }

        [NonAction]
        public string convertUrl(string a_url, string url)
        {
            a_url = a_url.Replace(url, "");
            return a_url;
        }

        [HttpPost]
        [Route("api/user/views_shares")]
        public string views_Shares([FromBody] Article article)
        {
            return admin_gid(article.site_url, article.modified_date, article.url);
           
        }

        [HttpPost]
        [Route("api/user/shared/views_shares")]
        public string views_Shares_user([FromBody] shared_input article)
        {
            return admin_gid(article.site_url, article.modified_date, article.url,article.username);

        }



        [NonAction]
        public string admin_gid(string url, DateTime publishDate, string a_url,string username)
        {
            get_admin_gid_Result res;
            using (var data = db.get_admin_gid(url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }
            Authorization auth = new Authorization(res.Email);
            var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
            result.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url)+";ga:campaign=@"+username;
            var final = result.Execute();
            int count = (int)final.TotalResults;
            if (count != 0)
            {
                IList<string> l = final.Rows[0];
                return l[0];
            }
            return "" + 0;

        }
        
    }
}
