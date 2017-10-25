using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalNetwork.Models
{
    public class ArticleModel
    {
        
        public string site_url {get; set;}
        public int aId { get; set; }
        public string title { get; set; }
        public string aUrl { get; set; }
        public string excerpt { get; set; }
        public string featuredImage { get; set; }
        public DateTime modifiedDate { get; set; }
    }


    public partial class user_article_input
    {
        public string uid { get; set; }
        public string category { get; set; }
        public string sub_category { get; set; }

    }

}