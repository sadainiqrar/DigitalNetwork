using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;
using Google.Apis.Services;
using Google.Apis.Urlshortener;
using Google.Apis.Urlshortener.v1;
using Google.Apis.Urlshortener.v1.Data;

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
        [HttpPost]
        [Route("api/ums/delete")]
        public int delete_ums([FromBody]User_Marketing_Sources ums)
        {
            if (countUms(ums.uid) > 1)
                return db.delete_ums(ums.ums_id);
            else
                return 0;
        }

        [HttpPost]
        [Route("api/url/shorten")]
        public string urlShortner([FromBody]User_Marketing_Sources data)
        {
            UrlshortenerService service = new UrlshortenerService(new BaseClientService.Initializer
            {
                ApplicationName = "digitalnetwork-182506",
                ApiKey = "AIzaSyDvURFxjBImiFEEsJjNunfVSvbrRP1u9yA"
            });
            Url response = service.Url.Insert(new Url { LongUrl = data.ums_id + "?utm_source=facebook&utm_medium=digitalmarket&utm_campaign=" + data.uid }).Execute();
            return response.Id;

        }

        // count_ums
        [NonAction]
        public int countUms(string uid)
        {

            int count = 0;
            count = db.count_ums(uid).FirstOrDefault<int?>() ?? 0;
            return count;
        }
    }
}
