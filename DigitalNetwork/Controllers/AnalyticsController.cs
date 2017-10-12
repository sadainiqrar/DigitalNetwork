using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Google.Apis.Discovery;
using Google.Apis.Analytics.v3;
using Google.Apis.Util.Store;
using Google.Apis.Services;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Google.Apis.Analytics.v3.Data;
using Google.Apis.Auth.OAuth2;
using System.Threading;
using System.IO;
using DigitalNetwork.DataModel;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using Newtonsoft.Json;

namespace DigitalNetwork.Controllers
{
    public class AnalyticsController : ApiController
    {

        [HttpPost]
        [Route("api/sessions")]
        public string PostSession([FromBody]Analytics_Input analytics_Input)
        {
            Authorization auth = new Authorization();
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id,analytics_Input.from_date,analytics_Input.to_date,analytics_Input.metrics);
            var session_result= result.Execute();
            IList<string> l = session_result.Rows[0];
            return l[0];
        
       }


        [HttpPost]
        [Route("api/campaign/sessions")]
        public List<Campaign_Session> PostC_Session([FromBody]Analytics_Input analytics_Input)
        {
            List<Campaign_Session> list = new List<Campaign_Session>();
            Authorization auth = new Authorization();
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.metrics);
            result.Dimensions = analytics_Input.campaign;
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

       


    }
}
