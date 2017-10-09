using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DigitalNetwork
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
           name: "Admin",
           url: "admin/{controller}/{action}/{id}",
           defaults: new { controller = "Dashboard", action = "Index", id = UrlParameter.Optional }
         );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { action = "Index", id = UrlParameter.Optional }
            );

       

            //routes.MapRoute(
            //    name: "Home",
            //    url: "",
            //    defaults: new { controller = "Home",  action = "Home", id = UrlParameter.Optional }
            //);

        }
    }
}

