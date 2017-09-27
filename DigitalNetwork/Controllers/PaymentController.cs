using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class PaymentController : ApiController
    {
        
        //add_Payment
        [HttpPut]
        [Route("api/payment/make")]
        public int PutPayment([FromBody]get_payment_Result _payment)
        {
            return dataCon.DB.db.add_payment(_payment.uid, _payment.traffic, _payment.amount, _payment.from_date, _payment.to_date, _payment.payment_date);
        }




        //get_payment
        [HttpPost]
        [Route("api/payment/history")]
        public IEnumerable<get_payment_Result> payment_history([FromBody] Payment _payment)
        {
            return dataCon.DB.db.get_payment(_payment.uid, null, null, null, null, null);
        }

    }
}
