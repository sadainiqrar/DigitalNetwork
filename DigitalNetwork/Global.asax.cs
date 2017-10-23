using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Optimization;
using DigitalNetwork.Scheduler;
using DigitalNetwork.Controllers;
using System.Threading.Tasks;

namespace DigitalNetwork
{
    public class WebApiApplication : System.Web.HttpApplication
    {
 
        protected void Application_Start()
        {
          
            GlobalConfiguration.Configure(WebApiConfig.Register);

            GlobalConfiguration.Configuration.EnsureInitialized();


            articleUpdate.Start();
            
        }

      

    }
}
