using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DigitalNetwork.DataModel;

namespace DigitalNetwork.Controllers
{
    public class GraphController : ApiController
    {
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

    }
}
