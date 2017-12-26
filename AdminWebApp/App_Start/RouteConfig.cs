using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AdminWebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

           
            //routes.MapRoute(
            //    name: "Default",
            //    url: "",
            //    defaults: new { controller = "Dashboard", action = "Index", id = UrlParameter.Optional }
            //);
            routes.MapRoute(
        name: "Default",
        url: "{*url}",
        defaults: new { controller = "Dashboard", action = "Index" }
    );




            //routes.MapRoute(
            //    name: "Home",
            //    url: "",
            //    defaults: new { controller = "Home",  action = "Home", id = UrlParameter.Optional }
            //);

        }
    }
}
