using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.DataModel;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class GraphController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        

        [HttpPost]
        [Route("api/user/graph/country")]
        public List<CountryStats> countryGraph([FromBody] trafficInput input)
        {

            ArticleController use = new ArticleController();
            get_admin_gid_Result res;
            List<CountryStats> stats = new List<CountryStats>();
            using (var data = db.get_admin_gid(input.site_url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }
            Authorization auth = new Authorization(res.Email);
            var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), use.convertDate(input.fromDate), use.convertDate(input.toDate), "ga:sessions");
            result.Dimensions = "ga:country";
            result.MaxResults = 5;
            result.Sort = "-ga:sessions";
            result.Filters = "ga:landingPagePath=@" + use.convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.uid + ";ga:medium=@referral";
            var final = result.Execute();
            int count = (int)final.TotalResults;
            if (count != 0)
            {
                foreach (var item in final.Rows)
                {
                    CountryStats temp = new CountryStats() { country = item[0], sessions = item[1] };
                    stats.Add(temp);
                }
            }
            return stats;

        }


        [HttpPost]
        [Route("api/user/graph/total")]
        public GraphStats articleTraffic([FromBody]trafficInput input)
        {
            ArticleController use = new ArticleController();
            user_traffic traffic = new user_traffic();
            GraphStats total = new GraphStats() { dateTime = "", sessions = "", earned = 0 };
            traffic.non_premium = 0;
            traffic.premium = 0;

            get_admin_gid_Result res;
            DateTime join;
            using (var data = db.get_joining_date(input.id))
            {

                join = data.FirstOrDefault<get_joining_date_Result>().date;
            }
            using (var data = db.get_admin_gid(input.site_url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }

                Authorization auth = new Authorization(res.Email);

                var result = auth.service.Data.Ga.Get("ga:" + res.ga_id, use.convertDate(join), use.convertDate(System.DateTime.Now), input.session );
                var result1 = auth.service.Data.Ga.Get("ga:" + res.ga_id, use.convertDate(join), use.convertDate(System.DateTime.Now), input.session);
                
                        result.Filters = "ga:landingPagePath=@" + use.convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.uid + ";ga:medium=@referral";
                        result1.Filters = "ga:landingPagePath=@" + use.convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.uid + ";ga:medium=@referral;ga:country=@Canada";
                    
                var session_result = result.Execute();
                var session_result1 = result1.Execute();
                int count = (int)session_result.TotalResults;
                if (count != 0)
                {
                    IList<string> l = session_result.Rows[0];
                    traffic.non_premium = traffic.non_premium + long.Parse(l[0]);

                }
                traffic.non_premium = traffic.non_premium + 0;
                int count2 = (int)session_result1.TotalResults;
                if (count2 != 0)
                {
                    IList<string> lp = session_result1.Rows[0];
                    traffic.premium = traffic.premium + long.Parse(lp[0]);

                }
                traffic.premium = traffic.premium + 0;
                
                traffic.non_premium = traffic.non_premium - traffic.premium;

            total.earned = total.earned + GetEarned(traffic.premium.ToString(), "premium") + GetEarned(traffic.non_premium.ToString(), "non-premium");
            total.sessions = (traffic.premium + traffic.non_premium).ToString();
                return total;
        }



        [HttpPost]
        [Route("api/user/graph/traffic")]
        public List<GraphStats> trafficGraph([FromBody] trafficInput input)
        {

            ArticleController use = new ArticleController();
            get_admin_gid_Result res;
            List<GraphStats> stats = new List<GraphStats>();
            using (var data = db.get_admin_gid(input.site_url))
            {

                res = data.FirstOrDefault<get_admin_gid_Result>();
            }
            Authorization auth = new Authorization(res.Email);
            var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), use.convertDate(input.fromDate), use.convertDate(input.toDate), "ga:sessions");
            var result1 = auth.service.Data.Ga.Get(("ga:" + res.ga_id), use.convertDate(input.fromDate), use.convertDate(input.toDate), "ga:sessions");
            if (input.extra=="month" || input.extra == "week")
            {
                result.Dimensions = "ga:month,ga:day";
                result1.Dimensions = "ga:month,ga:day";
            }
            else if (input.extra == "year")
            {
                result.Dimensions = "ga:year,ga:month";
                result1.Dimensions = "ga:year,ga:month";
            }
            
            result.Filters = "ga:landingPagePath=@" + use.convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.uid + ";ga:medium=@referral";
            result1.Filters = "ga:landingPagePath=@" + use.convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.uid + ";ga:medium=@referral;ga:country=@Canada";
            var final = result.Execute();
            var final1 = result1.Execute();
            int count = (int)final.TotalResults;
            int count1 = (int)final1.TotalResults;
            if (count != 0 && (count == count1))
            {
                for(int i=0; i<count; i++)
                {
                    var item1 = final.Rows[i];
                    var item2 = final1.Rows[i];
                    GraphStats temp2 = new GraphStats() { dateTime = item2[1] + "/" + item2[0], sessions = item2[2], earned = GetEarned(item2[2], "premium") };
                    GraphStats temp = new GraphStats() { dateTime = item1[1] + "/" + item1[0], sessions = (Int32.Parse(item1[2]) - Int32.Parse(temp2.sessions)).ToString(), earned = GetEarned((Int32.Parse(item1[2]) - Int32.Parse(temp2.sessions)).ToString(), "non-premium") };
                    stats.Add(new GraphStats() { dateTime = temp.dateTime, sessions = (Int32.Parse(temp.sessions) + Int32.Parse(temp2.sessions)).ToString(), earned = temp.earned + temp2.earned});
                }
            }
            return stats;

        }


        [NonAction]

        public double GetEarned(string sessions, string category)
        {
            RateController r = new RateController();
            var rate = r.GetRate(category).FirstOrDefault<get_rate_Result>().rate;
            return (Double.Parse(sessions) * Decimal.ToDouble(rate))/1000;
        }
    }
}
