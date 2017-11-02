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

        [HttpPost]
        [Route("api/user/articles")]
        public IEnumerable<get_articles_Result> PostArticles([FromBody] user_article_input article)
        {

            return dataCon.DB.db.get_articles(article.uid,article.category,article.sub_category);
        }

        [HttpPost]
        [Route("api/user/shared_articles")]
        public IEnumerable<get_shared_article_Result> Post_Shared_Articles([FromBody] user_article_input article)
        {

            return dataCon.DB.db.get_shared_article(article.uid, article.category, article.sub_category);
        }


        [HttpPut]
        [Route("api/user/insert/shared_article")]
        public int Put_Shared_Articles([FromBody] User_Articles article)
        {

            return dataCon.DB.db.add_shared_article(article.uid, article.serial_no, article.copied,article.shared);
        }

        [HttpPut]
        [Route("api/user/update/shared_article")]
        public int Update_Shared_Articles([FromBody] User_Articles article)
        {

            return dataCon.DB.db.update_shared_articles(article.uid, article.serial_no, article.shared, article.copied);
        }


        [HttpPut]
        [Route("api/admin/add/article")]
        public int Put_Article([FromBody] Article article)
        {

            return dataCon.DB.db.add_article(article.a_id, article.url, article.status, article.title, article.summary, article.photo_url, article.modified_date, article.url, article.category, article.sub_category,article.custom);
        }
    }
}
