using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class UmsController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        //get_ums
        [HttpGet]
        [Route("api/ums/{uid}")]
        public IEnumerable<string> GetUms(string uid)
        {
            return db.get_ums(uid);
        }

        //add_ums
        [HttpPut]
        [Route("api/ums/add")]
        public int PutUms([FromBody]User_Marketing_Sources ums)
        {
            return db.add_ums(ums.ums_id, ums.uid);
        }


        //delete_ums
        [HttpDelete]
        [Route("api/ums/delete")]
        public int putdelete_ums([FromBody]User_Marketing_Sources ums)
        {
            if (countUms(ums.uid) > 1)
                return db.delete_ums(ums.ums_id);
            else
                return 0;
        }

        // count_ums
        [NonAction]
        public int countUms(string uid)
        {

            int count = 0;
            count = db.count_ums(uid);
            return count;
        }
    }
}
