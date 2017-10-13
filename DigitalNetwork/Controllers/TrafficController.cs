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
    public class TrafficController : ApiController
    {

        [HttpPost]
        [Route("api/sessions")]
        public string PostSession([FromBody]Analytics_Input analytics_Input)
        {
            Authorization auth = new Authorization();
            var result = auth.service.Data.Ga.Get(analytics_Input.ga_id, analytics_Input.from_date, analytics_Input.to_date, analytics_Input.session);
            if ((analytics_Input.extra != null))
            {
                if (!analytics_Input.extra.Equals(""))
                {
                    result.Filters = analytics_Input.extra;
                }
            }
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
            Authorization auth = new Authorization();
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
            Authorization auth = new Authorization();
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
