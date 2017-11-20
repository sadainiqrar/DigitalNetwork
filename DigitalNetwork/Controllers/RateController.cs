using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class RateController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        //get_rate
        [HttpGet]
        [Route("api/rate/{category}")]
        public IEnumerable<get_rate_Result> GetRate(string category)
        {
            return db.get_rate(category); 
        }


        //update_rate
        [HttpPut]
        [Route("api/rate/update")]
        public int PutRate([FromBody]Rate _rate)
        {
            return db.update_rates(_rate.category, _rate.rate1, _rate.date);
        }

    }
}
