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
        //get_ums
        [HttpGet]
        [Route("api/ums/{uid}")]
        public IEnumerable<get_ums_Result> GetUms(string uid)
        {
            return dataCon.DB.db.get_ums(uid);
        }

        //add_ums
        [HttpPut]
        [Route("api/ums/add")]
        public int PutUms([FromBody]User_Marketing_Source ums)
        {
            return dataCon.DB.db.add_ums(ums.page_url, ums.description, ums.uid);
        }

        //update_ums
        [HttpPut]
        [Route("api/ums/update")]
        public int PutUpdate_Ums([FromBody]User_Marketing_Source ums)
        {
            return dataCon.DB.db.update_ums(ums.page_url, ums.description, ums.uid);
        }

        //delete_ums
        [HttpDelete]
        [Route("api/ums/delete")]
        public int putdelete_ums([FromBody]User_Marketing_Source ums)
        {
            if (countUms(ums.uid)>1)
             return dataCon.DB.db.delete_ums(ums.ums_id);
            else
             return 0; 
        }

       // count_ums
        [NonAction]
        public int countUms(string uid)
        {
            
            int count = 0;
            foreach (Nullable<int> result in dataCon.DB.db.count_ums(uid))
                count = result.Value;
            return count;
        }
    }
}
