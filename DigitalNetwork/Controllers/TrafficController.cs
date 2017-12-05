using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.DataModel;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using Newtonsoft.Json;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class TrafficController : ApiController
    {
        private digimarketEntities1 db = new digimarketEntities1();
        /* User Apis */

        [HttpGet]
        [Route("api/user/topusers")]
        public List<KeyValuePair<string, long>> TopUsers()
        {
            ArticleController a = new ArticleController();

            var to = System.DateTime.Now;
            var from = new DateTime(to.Year, to.Month, 1);
            //List < List < UserStats >> total_stats = new List<List<UserStats>>();
            Dictionary<string, long> allUsers = new Dictionary<string, long>();
            List<Procedure_Result> res = new List<Procedure_Result>();
            using (var data = db.Procedure())
            {
                res = data.ToList<Procedure_Result>();
            }
            foreach (var item in res)
            {


                Authorization auth = new Authorization(item.email);

                var result = auth.service.Data.Ga.Get("ga:" + item.ga_id, a.convertDate(from), a.convertDate(to) , "ga:Sessions");
                result.Dimensions = "ga:campaign";
                result.Filters = "ga:medium=@digitalmarket";
                var response = result.Execute();
                if (response.TotalResults != 0)
                {
                    foreach (var row in response.Rows)
                    {

                       
                        if(allUsers.ContainsKey(row[0]))
                        {
                            allUsers[row[0]] = allUsers[row[0]] + long.Parse(row[1]);
                        }
                        else
                        {
                            allUsers.Add(row[0], long.Parse(row[1]));
                        }



                    }

                }
                // total_stats.Add(user_stats);
            }
           // allUsers.Remove("(not set)");
            return  new List<KeyValuePair<string, long>>(allUsers);
        }




        [HttpPost]
        [Route("api/user/statistics")]
        public List<UserStats> statistics([FromBody]User_Analytic_Input analytics_Input)
        {
            //List < List < UserStats >> total_stats = new List<List<UserStats>>();

            List<UserStats> user_stats = new List<UserStats>();
            List<get_user_traffic_Result> res = get_all_sites(analytics_Input.uid);
            foreach (var item in res)
            {

                Authorization auth = new Authorization(item.email);

                var result = auth.service.Data.Ga.Get("ga:" + item.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session + ",ga:newUsers");
                result.Dimensions = "ga:date, " + analytics_Input.country;
                result.Filters = "ga:campaign=@" + analytics_Input.extra;
                var response = result.Execute();
                if (response.TotalResults != 0)
                {
                    foreach (var row in response.Rows)
                    {
                        UserStats temp = new UserStats() { day = "", premium = 0, non_premium = 0, total_traffic = 0, total_earning = 0, country_stats = new List<CountryStats>() };
                        // UserStats temp = user_stats.Last<UserStats>();


                        temp = user_stats.FirstOrDefault(x => x.day == row[0]);

                        if (temp == null)
                        {
                            temp = new UserStats() { day = "", premium = 0, non_premium = 0, total_traffic = 0, total_earning = 0, country_stats = new List<CountryStats>() };
                        }
                        if (!(temp.day.Equals(row[0])))
                        {

                            UserStats stats = new UserStats() { day = "", premium = 0, non_premium = 0,total_traffic=0,total_earning=0, country_stats = new List<CountryStats>() };
                            CountryStats cTemp = new CountryStats();
                            stats.day = row[0];
                            if (row[1].Equals("Canada"))
                            {
                                stats.premium += long.Parse(row[2]);
                            }
                            else
                            {
                                stats.non_premium += long.Parse(row[2]);
                            }

                            cTemp.country = row[1];
                            cTemp.sessions = row[2];
                            cTemp.newSessions = row[3];
                            stats.country_stats.Add(cTemp);
                            user_stats.Add(stats);
                        }
                        else
                        {

                            user_stats.Remove(temp);
                            CountryStats cTemp = new CountryStats();
                            if (row[1].Equals("Canada"))
                            {
                                temp.premium += long.Parse(row[2]);
                            }
                            else
                            {
                                temp.non_premium += long.Parse(row[2]);
                            }
                            cTemp.country = row[1];
                            cTemp.sessions = row[2];
                            cTemp.newSessions = row[3];
                            temp.country_stats.Add(cTemp);
                            user_stats.Add(temp);

                        }



                    }

                }
               // total_stats.Add(user_stats);
            }
            return user_stats;
        }



        [NonAction]
        public bool checkList(string row, List<UserStats> list)
        {
            var find = list.FirstOrDefault(x => x.day == row);
            if (find != null)
                return true;
            return false;
        }

        [HttpPost]
        [Route("api/user/sessions")]
        public user_traffic UserSessions([FromBody]User_Analytic_Input analytics_Input)
        {
            user_traffic traffic = new user_traffic();
            traffic.non_premium = 0;
            traffic.premium = 0;
            List<get_user_traffic_Result> res = get_all_sites(analytics_Input.uid);


            foreach (var item in res)
            {

                Authorization auth = new Authorization(item.email);

                var result = auth.service.Data.Ga.Get("ga:" + item.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
                var result1 = auth.service.Data.Ga.Get("ga:" + item.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
                if ((analytics_Input.extra != null))
                {
                    if (!analytics_Input.extra.Equals(""))
                    {
                        result.Filters = "ga:campaign=@" + analytics_Input.extra;
                        result1.Filters = "ga:campaign=@" + analytics_Input.extra + ";ga:country=@Canada";
                    }
                }
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
            }

            traffic.non_premium = traffic.non_premium - traffic.premium;
            return traffic;
        }


        public List<get_user_traffic_Result> get_all_sites(string uid)
        {
            return db.get_user_traffic(uid).ToList<get_user_traffic_Result>();
        }





        /* Admin Apis */
        [HttpPost]
        [Route("api/sessions")]
        public string PostSession([FromBody]Analytics_Input analytics_Input)
        {
            Authorization auth = new Authorization("sadain@digihawks.com");

            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            if ((analytics_Input.extra != null))
            {
                if (!analytics_Input.extra.Equals(""))
                {
                    result.Filters = analytics_Input.extra;
                }
            }
            var session_result= result.Execute();
            int count = (int)session_result.TotalResults;
            if (count != 0)
            {
                IList<string> l = session_result.Rows[0];
                return l[0];
            }
            return "" + 0;
        
       }


        [HttpPost]
        [Route("api/campaign/sessions")]
        public List<Campaign_Session> PostC_Session([FromBody]Analytics_Input analytics_Input)
        {
            List<Campaign_Session> list = new List<Campaign_Session>();
            Authorization auth = new Authorization("sadain@digihawks.com");
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            result.Dimensions = analytics_Input.campaign;
            if ((analytics_Input.extra != null))
            {
                if (!analytics_Input.extra.Equals(""))
                {
                    result.Filters = analytics_Input.extra;
                }
            }


            var C_session_result = result.Execute();
            int count=(int)C_session_result.TotalResults;
            for (int i=0;i<count;i++)
            {
               
              IList<string> l=  C_session_result.Rows[i];
                Campaign_Session CS = new Campaign_Session();
                CS.Campaign = l[0];
                CS.Session = l[1];
                list.Add(CS);
            }
            return list;

        }
       

        [HttpPost]
        [Route("api/pages/sessions")]
        public List<Page_Session> PostP_Session([FromBody]Analytics_Input analytics_Input)
        {
            List<Page_Session> list = new List<Page_Session>();
            Authorization auth = new Authorization("sadain@digihawks.com");
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            result.Dimensions = analytics_Input.landing_page_path;
            if ((analytics_Input.extra != null))
            {
                if (!analytics_Input.extra.Equals(""))
                {
                    result.Filters = analytics_Input.extra;
                }
            }


            var C_session_result = result.Execute();
            int count = (int)C_session_result.TotalResults;
            for (int i = 0; i < count; i++)
            {

                IList<string> l = C_session_result.Rows[i];
                Page_Session PS = new Page_Session();
                PS.Landing_Page_Path = l[0];
                PS.Session = l[1];
                list.Add(PS);
            }
            return list;

        }


        [HttpPost]
        [Route("api/pages/campaign/sessions")]
        public List<Page_Campaign_Session> PostP_C_Session([FromBody]Analytics_Input analytics_Input)
        {
            List<Page_Campaign_Session> list = new List<Page_Campaign_Session>();
            Authorization auth = new Authorization("sadain@digihawks.com");
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            result.Dimensions =analytics_Input.campaign+","+analytics_Input.landing_page_path;
            if ((analytics_Input.extra != null))
            {
                if (!analytics_Input.extra.Equals(""))
                {
                    result.Filters = analytics_Input.extra;
                }
            }
            var C_session_result = result.Execute();
            int count = (int)C_session_result.TotalResults;
            for (int i = 0; i < count; i++)
            {

                IList<string> l = C_session_result.Rows[i];
                Page_Campaign_Session PCS = new Page_Campaign_Session();
                PCS.Campaign = l[0];
                PCS.Landing_Page_Path = l[1];
                PCS.Session = l[2];
                list.Add(PCS);
            }
            return list;

        }
        

    }
}
