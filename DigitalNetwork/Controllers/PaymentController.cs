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
    public class PaymentController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        //add_Payment
        [HttpPut]
        [Route("api/payment/make")]
        public int PutPayment([FromBody]get_payment_Result _payment)
        {
            
            return db.add_payment(_payment.uid, _payment.traffic, _payment.amount, System.DateTime.Now);
        }




        //get_payment
        [HttpPost]
        [Route("api/payment/history")]
        public IEnumerable<get_payment_Result> payment_history([FromBody] Payment _payment)
        {
            return db.get_payment(_payment.uid);
        }

        [HttpPost]
        [Route("api/payment/details")]
        public PaymentStats payment_details([FromBody] User user)
        {
            PaymentStats stats = new PaymentStats() { total_earned = 0, total_traffic = 0, available = 0, last_paid = 0,unpaid_traffic=0 };
            user_earned earned = new user_earned() { premium = 0, non_premium = 0 };
            get_payment_Result last = new get_payment_Result();
            DateTime joiningDate = new DateTime();
            using (var join = new digimarketEntities1().get_joining_date(user.uid))
            {
                joiningDate = join.FirstOrDefault<get_joining_date_Result>().date;
            }

            user_traffic traffic = new TrafficController().UserSessions(new DataModel.User_Analytic_Input() { uid = user.uid, from_date = new ArticleController().convertDate(joiningDate), to_date = new ArticleController().convertDate(DateTime.Now),
            extra = user.username});
            using (var rate = new digimarketEntities1().get_rate("premium"))
            {
                earned.premium = earned.premium + ((traffic.premium * Decimal.ToDouble(rate.FirstOrDefault<get_rate_Result>().rate))/1000); 
            }
            using (var rate = new digimarketEntities1().get_rate("non-premium"))
            {
                earned.non_premium = earned.non_premium + ((traffic.non_premium * Decimal.ToDouble(rate.FirstOrDefault<get_rate_Result>().rate)) / 1000);
            }

            stats.total_traffic = traffic.premium + traffic.non_premium;

            stats.total_earned = earned.premium + earned.non_premium;
            using (var history = new digimarketEntities1().get_payment(user.uid))
            {
                try { 
                last = history.OrderByDescending(m => m.payment_date).FirstOrDefault() ?? new get_payment_Result() { traffic = 0, amount = 0, uid = user.uid }; 
                }
                catch(Exception ex)
                {
                }
            }

            stats.last_paid = Decimal.ToDouble(last.amount);
            using (var history = new digimarketEntities1().get_total_earned(user.uid))
            {
                try
                {
                    var result = history.FirstOrDefault<get_total_earned_Result>();
                    stats.available = stats.total_earned - Decimal.ToDouble(result.totalAmount ?? 0);
                    stats.unpaid_traffic = stats.total_traffic - Decimal.ToInt64(result.totalTraffic ?? 0);
                }
                catch(Exception ex)
                {
                }
            }


            return stats;
        }
    }
}
