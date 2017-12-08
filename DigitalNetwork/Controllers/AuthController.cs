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
        [HttpPost]
        [Route("api/admin/login")]
        public admin_site_list PostAdmin([FromBody] admin_sign_in_Result admin)
        {
            try
            {
                admin_site_list administrator = new admin_site_list();
                int count = 0;
                using (var data = new digimarketEntities1().admin_sign_in(admin.email))
                {
                    count = data.Count<admin_sign_in_Result>();
                }
                if (count == 0)
                {
                    new digimarketEntities1().admin_sign_up(admin.email, admin.adminname, admin.photo_url);
                    Authorization authfirst = new Authorization(admin.email);
                }

                new digimarketEntities1().admin_update(admin.email, admin.adminname, admin.photo_url);
                admin_sign_in_Result _admin = new digimarketEntities1().admin_sign_in(admin.email).ElementAt<admin_sign_in_Result>(0);
                List<get_site_Result> sites = new List<get_site_Result>();
                try { 
                foreach (get_site_Result site in new digimarketEntities1().get_site(_admin.email))
                {
                    sites.Add(site);
                }
                }
                catch(Exception e)
                { }

                administrator.email = _admin.email;
                administrator.adminname = _admin.adminname;
                administrator.photo_url = _admin.photo_url;
                administrator.sites = sites;
                return administrator;
            }
            catch (Exception e)
            {
                return null;
            }

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

        [HttpPost]
        [Route("api/user/status")]
        public string GetUserStatus([FromBody]User_Date user)
        {
            return db.get_user_status(user.uid).FirstOrDefault<string>();

        }



        //user_update
        [HttpPut]
        [Route("api/user/update")]
        public IEnumerable<user_sign_in_Result> PutUpdate_User([FromBody] User_Date user)
        {
            db.user_update(user.uid, user.status);
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
