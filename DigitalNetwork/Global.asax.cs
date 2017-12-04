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
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR;

namespace DigitalNetwork
{
    public class WebApiApplication : System.Web.HttpApplication
    {
 
        protected void Application_Start()
        { 
            articleUpdate.Start();
        }

       
    }
}
