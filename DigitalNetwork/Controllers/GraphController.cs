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
        [Route("api/time/sessions")]
        public List<Time_Session> PostC_Session([FromBody]Analytics_Input analytics_Input)
        {
            List<Time_Session> list = new List<Time_Session>();
            Authorization auth = new Authorization("sadain@digihawks.com");
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            result.Dimensions = "ga:day";
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
                Time_Session TS = new Time_Session();
                TS.time = l[0];
                TS.Session = l[1];
                list.Add(TS);
            }
            return list;

        }



        [HttpPost]
        [Route("api/user/graph/country")]
        public List<CountryStats> countryGraph([FromBody] graphInput input)
    {
        get_admin_gid_Result res;
            List<CountryStats> stats = new List<CountryStats>();
        using (var data = db.get_admin_gid(input.site_url))
        {

            res = data.FirstOrDefault<get_admin_gid_Result>();
        }
        Authorization auth = new Authorization(res.Email);
        var result = auth.service.Data.Ga.Get(("ga:" + res.ga_id), new ArticleController().convertDate(input.fromDate), new ArticleController().convertDate(input.toDate), "ga:sessions");
        result.Dimensions = "ga:country";
            result.MaxResults = 5;
            result.Sort = "-ga:sessions";
        result.Filters = "ga:landingPagePath=@" + new ArticleController().convertUrl(input.url, input.site_url) + ";ga:campaign=@" + input.username + ";ga:medium=@referral";
        var final = result.Execute();
        int count = (int)final.TotalResults;
        if (count != 0)
        {
            foreach(var item in final.Rows)
                {
                    CountryStats temp = new CountryStats() { country = item[0], sessions = item[1] };
                    stats.Add(temp);
                }
        }
            return stats;

    }
}
}