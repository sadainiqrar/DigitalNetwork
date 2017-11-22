using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class AuthController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        ////admin_login
        //[HttpPost]
        //[Route("api/admin/login")]
        //public admin_site_list PostAdmin([FromBody] admin_sign_in_Result admin)
        //{
        //    try
        //    {
        //        admin_site_list administrator = new admin_site_list();

        //        admin_sign_in_Result _admin = db.admin_sign_in(admin.email, admin.password).ElementAt<admin_sign_in_Result>(0);
        //        List<get_site_Result> sites = new List<get_site_Result>();
        //        foreach (get_site_Result site in db.get_site(_admin.email))
        //        {
        //            sites.Add(site);
        //        }

        //        administrator.email = _admin.email;
        //        administrator.adminname = _admin.adminname;
        //        administrator.password = _admin.password;
        //        administrator.photo_url = _admin.photo_url;
        //        administrator.sites = sites;

        //        return administrator;
        //    }catch(Exception e)
        //    {
        //        return null;
        //    }

        //}

        //admin_signup
        [HttpGet]
        [Route("api/admin/signin")]
        public int PutSignup_Admin()
        {

            Authorization auth = new Authorization("sadain@digihawks.com");
            var result = auth.service.Management.Accounts.List();
            var account = result.Execute();
            return db.admin_sign_up(account.Username, account.Username,"photo");
        }

        [HttpPost]
        [Route("api/admin/addsite")]
        public IEnumerable<get_site_Result> PostAdminSite([FromBody]Admin admin)
        {

            Authorization auth = new Authorization(admin.email);
            var result = auth.service.Management.Profiles.List("~all","~all");
            var site = result.Execute();
            foreach(var item in site.Items)
            {
               db.add_site(item.WebsiteUrl, item.Name, item.Id, site.Username);
            }
            return db.get_site(site.Username);
        }



        //user_login
        [HttpPost]
        [Route("api/user/login")]
        public IEnumerable<user_sign_in_Result> GetUser([FromBody]user_sign_in_Result user)
        {
            var ob = db.user_sign_in(user.uid);
            int count = ob.Count<user_sign_in_Result>();
            if(count==0)
            {
                string username = UsernameCreater(user.fullname,user.uid);
                db.user_sign_up(user.uid, username, user.photourl, user.fullname,System.DateTime.Now);
            }

            return db.user_sign_in(user.uid);
           
           
        }



        //user_update
        [HttpPut]
        [Route("api/user/update")]
        public IEnumerable<user_sign_in_Result> PutUpdate_User([FromBody] user_sign_up_Result user)
        {
            db.user_update(user.uid, user.photourl);
            return db.user_sign_in(user.uid);
        }


        public string UsernameCreater(string name,string uid)
        {
            string [] nam = name.Split();
            string names = nam[0];
            long id = long.Parse(uid);
            // Convert integer as a hex in a string variable
            string hexValue = id.ToString("X");
         
        
            return names + hexValue;
        }


    }
}
