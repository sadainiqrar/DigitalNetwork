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



        [HttpPost]
        [Route("api/admin/articles")]
        public IEnumerable<get_Articles> PostAdminArticles([FromBody] ArticleInput admin)
        {
            List<get_admin_articles_Result> articleList = new List<get_admin_articles_Result>();
            List<get_Articles> finalArticleList = new List<get_Articles>();
            using (var articles = db.get_admin_articles(admin.email,admin.site_url,admin.status))
            {

                articleList = articles.ToList<get_admin_articles_Result>();
            }
            foreach (var item in articleList)
            {
                get_Articles post = new get_Articles();
                post.serial_no = item.serial_no;
                post.a_id = item.a_id;
                post.title = item.title;
                post.site_url = item.site_url;
                post.site_name = getSiteName(post.site_url);
                post.status = item.status;
                post.photo_url = item.photo_url;
                post.modified_date = item.modified_date;
                post.category = item.category;
                post.url = item.url;
                post.summary = item.summary;
                post.custom = item.custom;
                post.sub_category = item.sub_category;
               

                    post.shares = 0;

                    post.views = "0";
              
                finalArticleList.Add(post);
            }
            return finalArticleList;
        }

        [HttpPost]
        [Route("api/admin/articles/freezed")]
        public IEnumerable<get_Articles> PostFreezedArticles([FromBody] ArticleInput admin)
        {
            List<get_deleted_articles_Result> articleList = new List<get_deleted_articles_Result>();
            List<get_Articles> finalArticleList = new List<get_Articles>();
            using (var articles = db.get_deleted_articles(admin.email, admin.site_url))
            {

                articleList = articles.ToList<get_deleted_articles_Result>();
            }
            foreach (var item in articleList)
            {
                get_Articles post = new get_Articles();
                post.serial_no = item.serial_no;
                post.a_id = item.a_id;
                post.title = item.title;
                post.site_url = item.site_url;
                post.site_name = getSiteName(post.site_url);
                post.status = false;
                post.photo_url = "";
                post.modified_date = item.modified_date;
                post.category = item.category;
                post.url = item.url;
                post.summary = item.summary;
                post.custom = item.custom;
                post.sub_category = item.sub_category;


                post.shares = 0;

                post.views = "0";

                finalArticleList.Add(post);
            }
            return finalArticleList;
        }


        [HttpPut]
        [Route("api/admin/add/article")]
        public int Put_Article([FromBody] Article article)
        {
            Random r = new Random();
            int n = r.Next();
            return db.add_article(n, article.url,false, article.title, article.summary, article.photo_url,System.DateTime.Now, article.site_url, "Premium", "Political", true);
        }


        [HttpPost]
        [Route("api/admin/articles/update")]
        public int updateAdminArticles([FromBody] Article article)
        {
            return new digimarketEntities1().update_articles(article.status,article.serial_no,article.category,article.sub_category);
        }

        [HttpGet]
        [Route("api/admin/articles/delete/{id}")]
        public int deleteAdminArticles(int id)
        {
            return new digimarketEntities1().delete_article(id);
        }


        [HttpPost]
        [Route("api/admin/traffic_earned")]
        public GraphStats views_Shares_user([FromBody] Admin_Article_Input article)
        {
            return admin_traffic(article.site_url, article.modified_date, article.url, article.email, article.ga_id);

        }



        /// <summary>
        /// //////////////////User APIS///////////////////////
        /// </summary>
        /// <param name="serial"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/user/article/{serial}")]
        public getArticleBySerialNumber GetSingleArticle(int serial)
        {
            getArticleBySerialNumber article = new getArticleBySerialNumber();
            getArticleBySerial_Result temp = new getArticleBySerial_Result();
            using (var data = db.getArticleBySerial(serial))
            {
                temp = data.FirstOrDefault<getArticleBySerial_Result>();
                article.title = temp.title;
                article.url = temp.url;
                article.summary = temp.summary;
                article.serial_no = temp.serial_no;
                article.photo_url = temp.photo_url;
                article.modified_date = temp.modified_date;
                article.a_id = temp.a_id;
                article.category = temp.category;
                article.custom = temp.custom;
                article.site_url = temp.site_url;
                article.status = temp.status;
                article.sub_category = temp.sub_category;
                article.site_name = getSiteName(article.site_url);
            }
                return article;

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
                post.site_name = getSiteName(post.site_url);

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


        [NonAction]
        public string getSiteName(string site_url)
        {
                return db.get_site_name(site_url).FirstOrDefault<string>();
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
                post.site_name = getSiteName(post.site_url);
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
        public GraphStats views_Shares_user([FromBody] shared_input article)
        {
            return admin_gid(article.site_url, article.modified_date, article.url, article.username);

        }



        [NonAction]
        public GraphStats admin_gid(string url, DateTime publishDate, string a_url, string username)
        {
            RateController rate = new RateController();
            user_earned earned = new user_earned() { premium = 0, non_premium = 0 };
            get_admin_gid_Result res;
            user_traffic traffic = new user_traffic() { premium = 0, non_premium=0 };
            using (var data = db.get_admin_gid(url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }
            Authorization auth = new Authorization(res.Email);
            var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
            result.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url) + ";ga:campaign=@" + username;
            var result1 = auth.service.Data.Ga.Get(("ga:" + res.ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
            result1.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url) + ";ga:campaign=@" + username +";ga:country=@Canada";
         
            var final1 = result1.Execute();
            var final = result.Execute();
            int count = (int)final.TotalResults;
            int count1 = (int)final1.TotalResults;
            if (count1 != 0)
            {
                IList<string> l = final1.Rows[0];
               traffic.premium+=long.Parse(l[0]);
            }
            if (count != 0)
            {
                IList<string> l = final.Rows[0];
               traffic.non_premium+=long.Parse(l[0]);
            }
            traffic.non_premium = traffic.non_premium - traffic.premium;

            earned.premium = (Decimal.ToDouble(rate.GetRate("premium").FirstOrDefault<get_rate_Result>().rate) * traffic.premium)/1000;
            earned.non_premium = (Decimal.ToDouble(rate.GetRate("non-premium").FirstOrDefault<get_rate_Result>().rate) * traffic.non_premium)/1000;
            return new GraphStats() { dateTime = "", sessions = (traffic.premium + traffic.non_premium).ToString(), earned = earned.premium + earned.non_premium };
        }



        [NonAction]
        public GraphStats admin_traffic(string url, DateTime publishDate, string a_url, string email,string ga_id)
        {
            RateController rate = new RateController();
            user_earned earned = new user_earned() { premium = 0, non_premium = 0 };
            user_traffic traffic = new user_traffic() { premium = 0, non_premium = 0 };
            
            Authorization auth = new Authorization(email);
            var result = auth.service.Data.Ga.Get(("ga:" + ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
            result.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url);
            var result1 = auth.service.Data.Ga.Get(("ga:" + ga_id), convertDate(publishDate), convertDate(System.DateTime.Now), "ga:sessions");
            result1.Filters = "ga:medium=@referral;ga:landingPagePath=@" + convertUrl(a_url, url) + ";ga:country=@Canada";

            var final1 = result1.Execute();
            var final = result.Execute();
            int count = (int)final.TotalResults;
            int count1 = (int)final1.TotalResults;
            if (count1 != 0)
            {
                IList<string> l = final1.Rows[0];
                traffic.premium += long.Parse(l[0]);
            }
            if (count != 0)
            {
                IList<string> l = final.Rows[0];
                traffic.non_premium += long.Parse(l[0]);
            }
            traffic.non_premium = traffic.non_premium - traffic.premium;

            earned.premium = (Decimal.ToDouble(rate.GetRate("premium").FirstOrDefault<get_rate_Result>().rate) * traffic.premium) / 1000;
            earned.non_premium = (Decimal.ToDouble(rate.GetRate("non-premium").FirstOrDefault<get_rate_Result>().rate) * traffic.non_premium) / 1000;
            return new GraphStats() { dateTime = "", sessions = (traffic.premium + traffic.non_premium).ToString(), earned = earned.premium + earned.non_premium };
        }

    }
}
