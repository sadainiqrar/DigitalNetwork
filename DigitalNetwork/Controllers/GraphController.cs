﻿using System;
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
        [Route("api/admin/graph/traffic")]
        public List<GraphStats> trafficAdminGraph([FromBody] trafficInput input)
        {

            ArticleController use = new ArticleController();
        
            List<GraphStats> stats = new List<GraphStats>();
        
            Authorization auth = new Authorization(input.uid);
            var result = auth.service.Data.Ga.Get(("ga:" + input.id), use.convertDate(input.fromDate), use.convertDate(input.toDate), "ga:sessions");
            var result1 = auth.service.Data.Ga.Get(("ga:" + input.id), use.convertDate(input.fromDate), use.convertDate(input.toDate), "ga:sessions");
            if (input.extra == "month" || input.extra == "week")
            {
                result.Dimensions = "ga:month,ga:day";
                result1.Dimensions = "ga:month,ga:day";
            }
            else if (input.extra == "year")
            {
                result.Dimensions = "ga:year,ga:month";
                result1.Dimensions = "ga:year,ga:month";
            }

            result.Filters = "ga:medium=@referral";
            result1.Filters =  "ga:medium=@referral;ga:country=@Canada";
            var final = result.Execute();
            var final1 = result1.Execute();
            int count = (int)final.TotalResults;
            int count1 = (int)final1.TotalResults;
            if (count != 0 && (count == count1))
            {
                for (int i = 0; i < count; i++)
                {
                    var item1 = final.Rows[i];
                    var item2 = final1.Rows[i];
                    GraphStats temp2 = new GraphStats() { dateTime = item2[1] + "/" + item2[0], sessions = item2[2], earned = GetEarned(item2[2], "premium") };
                    GraphStats temp = new GraphStats() { dateTime = item1[1] + "/" + item1[0], sessions = (Int32.Parse(item1[2]) - Int32.Parse(temp2.sessions)).ToString(), earned = GetEarned((Int32.Parse(item1[2]) - Int32.Parse(temp2.sessions)).ToString(), "non-premium") };
                    stats.Add(new GraphStats() { dateTime = temp.dateTime, sessions = (Int32.Parse(temp.sessions) + Int32.Parse(temp2.sessions)).ToString(), earned = temp.earned + temp2.earned });
                }
            }
            return stats;

        }



        [HttpPost]
        [Route("api/admin/stats/traffic")]
        public AdminGraph statAdminGraph([FromBody] Analytics_Input input)
        {

          
            ArticleController a = new ArticleController();
            List<GraphStats> stats = new List<GraphStats>() ;
            AdminGraph data = new AdminGraph() { amount = 0.0, graph=stats };
            var to = System.DateTime.Now;
            var from = new DateTime(to.Year, to.Month - 1, to.Day);
            //List < List < UserStats >> total_stats = new List<List<UserStats>>();

            List<GraphStats> list = new List<GraphStats>();


            Authorization auth = new Authorization(input.extra);
            var result = auth.service.Data.Ga.Get("ga:" + input.ga_id, a.convertDate(from), a.convertDate(to), input.session);
          
         
            var result1 = auth.service.Data.Ga.Get("ga:" + input.ga_id, a.convertDate(from), a.convertDate(to), input.session);

            result.Dimensions = "ga:year,ga:month,ga:day";
            result1.Dimensions = "ga:year,ga:month,ga:day";

            result.Filters = "ga:medium=@referral";
            result1.Filters = "ga:medium=@referral;ga:country=@Canada";
            var final = result.Execute();
            var final1 = result1.Execute();
            int count = (int)final.TotalResults;
            int count1 = (int)final1.TotalResults;
            if (count != 0 && (count == count1))
            {
                for (int i = 0; i < count; i++)
                {
                    var item1 = final.Rows[i];
                    var item2 = final1.Rows[i];
                    double pEarned = GetEarned(item2[3], "premium") ;
                    double nEarned = GetEarned((Int32.Parse(item1[3]) - Int32.Parse(item2[3])).ToString(), "non-premium");
                    data.amount += pEarned + nEarned;

                  
                    GraphStats temp = new GraphStats() { dateTime = item2[2] + "/"+ item1[1] + "/" + item1[0], sessions = (Int32.Parse(item1[3]) ).ToString() , earned = GetEarned((Int32.Parse(item1[3]) - Int32.Parse(item2[3])).ToString(), "non-premium")+ GetEarned(item2[3], "premium") };
                    stats.Add(new GraphStats() { dateTime = temp.dateTime, sessions = temp.sessions, earned = temp.earned });
                }
                data.graph = stats;
            }
            return data;

        }




        /// <summary>
        /// /////////////////////////////////user Api///////////////////////////////
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
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




        [HttpGet]
        [Route("api/user/realtime")]
        public Dictionary<string, RealtimeModel> statistics()
        {
            List<getAllUser_Result> users = new List<getAllUser_Result>();
            digimarketEntities1 db = new digimarketEntities1();
            using (var data = db.getAllUser())
            {
                users = data.ToList<getAllUser_Result>();
            }
            Dictionary<string,RealtimeModel> realtimeList = new Dictionary<string, RealtimeModel>();
            foreach (var user in users)
            {
                TrafficController trafficController = new TrafficController();
                //List < List < UserStats >> total_stats = new List<List<UserStats>>();

                RealtimeModel final = new RealtimeModel() { total_traffic = 0, message = "BackEnd Task for" + user.fullname, country_stats = new List<CountryStat>() };

                List<get_user_traffic_Result> res = trafficController.get_all_sites(user.uid);
                foreach (var item in res)
                {
                    
                    Authorization auth = new Authorization(item.email);
                    var result = auth.service.Data.Realtime.Get("ga:" + item.ga_id, "rt:activeUsers");
                    result.Dimensions = "rt:country";
                    result.Filters = "ga:campaign=@" + user.username;
                    var response = result.Execute();
                    if (response.TotalResults != 0)
                    {
                        final.total_traffic = final.total_traffic + Int64.Parse(response.TotalsForAllResults["rt:activeUsers"]);
                        foreach (var row in response.Rows)
                        {
                            // UserStats temp = user_stats.Last<UserStats>();

                            CountryStat cStats = new CountryStat();

                            cStats = final.country_stats.FirstOrDefault(x => x.country == row[0]);


                            if (cStats == null)
                            {
                                cStats = new CountryStat() { country = row[0], sessions = Int64.Parse(row[1]) };
                                final.country_stats.Add(cStats);
                            }
                            else
                            {
                                final.country_stats.Remove(cStats);
                                cStats.sessions = cStats.sessions + Int64.Parse(row[1]);
                                final.country_stats.Add(cStats);

                            }
                        }
                    }
                }
                realtimeList.Add(user.uid, final);
            }
            return realtimeList;
        }







    }
}
