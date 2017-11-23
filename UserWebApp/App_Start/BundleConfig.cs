using System.Web;
using System.Web.Optimization;

namespace UserWebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;   //enable CDN support
                                     //add link to jquery on the CDN

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                "~/js/bootstrap.min.js",
                "~/js/paper-dashboard.js",
                "~/Scripts/jquery-1.10.2.min.js"
                        ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/modal.css",
                "~/Content/bootstrap.min.css",
                 "~/Content/animate.css",
                 "~/Content/angular-material.min.css",
                   "~/Content/paper-dashboard.css",
                 "~/Content/custom.css"




                 ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(

                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",

                "~/js/angular-facebook.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-validator.js",
                "~/Scripts/angular-base64.js",
                 "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-file-upload.js",
                "~/Scripts/angucomplete-alt.min.js",
                "~/Scripts/angular-animate.min.js",
                "~/Scripts/angular-aria.min.js",
                "~/Scripts/angular-messages.min.js",
                "~/Scripts/angular-material.min.js",
                "~/Scripts/material.indigo-pink.min.js"

                        ));
            bundles.Add(new ScriptBundle("~/bundles/adminScript").Include(
                 "~/Scripts/script.js",
                        "~/Scripts/controllers/mainController.js",
                        "~/Scripts/controllers/articlesController.js",
                        "~/Scripts/controllers/articlestatsController.js",
                        "~/Scripts/controllers/invoicesController.js",
                        "~/Scripts/controllers/paymentController.js",
                        "~/Scripts/controllers/profileController.js",
                        "~/Scripts/controllers/realtimeController.js",
                        "~/Scripts/controllers/trafficController.js",
                        "~/Scripts/controllers/userdataController.js",
                        "~/Scripts/controllers/userstatsController.js",
                            "~/Scripts/controllers/dashboardController.js",

                        "~/Scripts/factories/articleFactory.js",

                        "~/Scripts/factories/singleArticleFactory.js",
                        "~/Scripts/factories/updateArticleFactory.js",
                         "~/Scripts/factories/sessionFactory.js",
                         "~/Scripts/factories/paymentFactory.js",
                           "~/Scripts/factories/statisticsFactory.js",
                           "~/Scripts/services/modalService.js",
                           "~/Scripts/services/modalDirective.js",
                           "~/Scripts/controllers/sourcesController.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/homeScript").Include(

                        "~/Scripts/services/homeservice/authentication.service.js",
                        "~/Scripts/services/homeservice/flash.service.js",
                        "~/Scripts/services/homeservice/user.service.js",


                        "~/Scripts/controllers/home/login.controller.js",
                        "~/Scripts/controllers/home/register.controller.js"
                 ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            BundleTable.EnableOptimizations = false;
        }
    }
}
