using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DigitalNetwork.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home

        //[Route("/")]
        public ActionResult Home()
        {
            return View();
        }
    }
}