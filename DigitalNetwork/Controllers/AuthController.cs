using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;
using DigitalNetwork.DataModel;

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
                int site_count = 0;
                admin_site_list administrator = new admin_site_list();
                int count = 0;
                using (var data = new digimarketEntities1().admin_sign_in(admin.email))
                {
                    count = data.Count<admin_sign_in_Result>();
                }
                if (count == 0)
                {
                    Authorization authfirst = new Authorization(admin.email);
                    try
                    {
                        site_count =  authfirst.service.Management.Profiles.List("~all", "~all").Execute().TotalResults.Value;
                        if (site_count == 0 || site_count.Equals(null))
                        {
                            return null;
                        }
                        else
                        {

                            new digimarketEntities1().admin_sign_up(admin.email, admin.adminname, admin.photo_url);
                        }
                    }
                    catch(Exception ex)
                    {
                        return null;
                    }
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
        [Route("api/admin/avaiableSites")]
        public List< get_all_site_Result> PostAdminSite([FromBody]Admin admin)
        {
            List<get_all_site_Result> gSites = new List<get_all_site_Result>();
            Authorization auth = new Authorization(admin.email);
            var result = auth.service.Management.Profiles.List("~all","~all");
            var sites = result.Execute();
            Dictionary<string,get_all_site_Result> dbSites = new Dictionary<string,get_all_site_Result>();
            using (var data = new digimarketEntities1().get_all_site())
            {
                dbSites = data.ToDictionary(t => t.site_url, t => t);
            }
            foreach (var site in sites.Items)
            {
                if(!dbSites.ContainsKey(site.WebsiteUrl))
                gSites.Add(new get_all_site_Result() { site_url = site.WebsiteUrl, site_name = site.Name, ga_id = site.Id, custom = false });

            }


            return gSites;
        }


        [HttpPost]
        [Route("api/admin/addSite")]
        public List<get_site_Result> AddAdminSite([FromBody]siteInput site_Result)
        {

             new digimarketEntities1().add_site(site_Result.site_url, site_Result.site_name, site_Result.ga_id, site_Result.email, site_Result.custom);
 
            List<get_site_Result> AdminSites = new List<get_site_Result>();
            using (var data = new digimarketEntities1().get_site(site_Result.email))
            {
                AdminSites = data.ToList<get_site_Result>();
            }
            return AdminSites;

        }

        [HttpPost]
        [Route("api/admin/deleteSite")]
        public List<get_site_Result> DeleteAdminSite([FromBody]siteInput site_Result)
        {

            new digimarketEntities1().delete_site(site_Result.site_url,site_Result.email);

            List<get_site_Result> AdminSites = new List<get_site_Result>();
            using (var data = new digimarketEntities1().get_site(site_Result.email))
            {
                AdminSites = data.ToList<get_site_Result>();
            }
            return AdminSites;

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
