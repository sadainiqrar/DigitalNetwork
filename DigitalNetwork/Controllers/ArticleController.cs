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
using System.Web.Helpers;
using Newtonsoft.Json;

namespace DigitalNetwork.Controllers
{
    public class ArticleController : ApiController
    {

        
        [HttpGet]
        [Route("api/admin/articles")]
        public IEnumerable<get_admin_articles_Result> Geti()
        {

            return dataCon.DB.db.get_admin_articles("zuraiz.com", "http://trumpgossiptoday.com");


        }

        [HttpPost]
        [Route("api/admin/articles/{id}")]
        public IEnumerable<get_admin_single_article_Result> PostSingleArticle(int id,[FromBody] AdminSite adsite)
        {

            getArticleBySerial_Result article = dataCon.DB.db.getArticleBySerial(id).ElementAt<getArticleBySerial_Result>(0);

            return dataCon.DB.db.get_admin_single_article(article.a_id, adsite.email, article.site_url);

        }



        [HttpPost]
        [Route("api/admin/articles/{id}/update")]
        public bool updateSingleArticle(int id)
        {
            getArticleBySerial_Result article = dataCon.DB.db.getArticleBySerial(id).ElementAt< getArticleBySerial_Result>(0);
            int result = dataCon.DB.db.update_articles(!article.status, id);
            article = dataCon.DB.db.getArticleBySerial(id).ElementAt<getArticleBySerial_Result>(0);
            return article.status;

        }
        [HttpGet]
        [Route("api/user/articles")]
        public IEnumerable<get_articles_Result> GetArticles()
        {

            return dataCon.DB.db.get_articles();


        }



    }
}
