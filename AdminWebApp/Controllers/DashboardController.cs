using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminWebApp.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
       // [Route("/admin/dashboard")]
        public ActionResult Index()
        {
            return View();
        }
    }
}