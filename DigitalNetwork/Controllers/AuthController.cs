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

        //admin_login
        [HttpPost]
        [Route("api/admin/login")]
        public IEnumerable<admin_sign_in_Result> PostAdmin([FromBody] admin_sign_in_Result admin)
        {
            return dataCon.DB.db.admin_sign_in(admin.email,admin.password);
        }

        //admin_signup
        [HttpPut]
        [Route("api/admin/create")]
        public int PutSignup_Admin([FromBody] admin_sign_up_Result admin)
        {
            return dataCon.DB.db.admin_sign_up(admin.email, admin.adminname, admin.password, admin.photo_url, admin.site_name, admin.site_url, admin.ga_id);
        }

        //admin_update
        [HttpPut]
        [Route("api/admin/update")]
        public IEnumerable<admin_sign_in_Result> PutUpdate_Admin([FromBody] admin_sign_in_Result admin)
        {
            dataCon.DB.db.admin_update(admin.email, admin.adminname, admin.password, admin.photo_url);
            return dataCon.DB.db.admin_sign_in(admin.email, admin.password);

        }

        //user_login
        [HttpPost]
        [Route("api/user/login")]
        public IEnumerable<user_sign_in_Result> GetUser([FromBody]user_sign_in_Result user)
        {
            return dataCon.DB.db.user_sign_in(user.email, user.password);
        }

        //user_signup
        [HttpPut]
        [Route("api/user/create")]
        public int PutSignup_User([FromBody] user_sign_up_Result user )
        {
            return dataCon.DB.db.user_sign_up(user.email,user.uid,user.username,user.password,user.photourl,user.url,user.description);
        }

        //user_update
        [HttpPut]
        [Route("api/user/update")]
        public IEnumerable<user_sign_in_Result> PutUpdate_User([FromBody] user_sign_up_Result user)
        {
            dataCon.DB.db.user_sign_up(user.email, user.uid, user.username, user.password, user.photourl, user.url, user.description);
            return dataCon.DB.db.user_sign_in(user.email, user.password);
        }

    }
}
