using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalNetwork.Models
{
    public class AdminSite
    {
        
        public string email { get; set; }
    }
    public partial class user_sign_up_Result
    {
        public string uid { get; set; }
        public string username { get; set; }
        public string photourl { get; set; }
        public string user_token { get; set; }
    }



    public partial class admin_sign_up_Result
    {
        public string email { get; set; }
        public string adminname { get; set; }
        public string password { get; set; }
        public string photo_url { get; set; }
        public string site_name { get; set; }
        public string site_url { get; set; }
        public string ga_id { get; set; }
    }


    public partial class admin_site_list
    {
        public string email { get; set; }
        public string adminname { get; set; }
        public string photo_url { get; set; }
        public List<get_site_Result> sites { get; set; }

    
    }
}