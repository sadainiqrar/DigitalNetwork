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
        //get_rate
        [HttpGet]
        [Route("api/rate/{category}")]
        public IEnumerable<get_rate_Result> GetRate(string category)
        {
            return dataCon.DB.db.get_rate(category); 
        }


        //update_rate
        [HttpPut]
        [Route("api/rate/update")]
        public int PutRate([FromBody]Rate _rate)
        {
            return dataCon.DB.db.update_rates(_rate.category, _rate.rate1, _rate.date);
        }

    }
}
