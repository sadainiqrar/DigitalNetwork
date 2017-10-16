using System.Web;
using System.Web.Optimization;

namespace DigitalNetwork
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;   //enable CDN support
                                     //add link to jquery on the CDN

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                   
                "~/js/bootstrap.js",
                "~/js/app.js",
                "~/js/app.plugin.js",
                "~/js/slimscroll/jquery.slimscroll.min.js",
                "~/js/charts/sparkline/jquery.sparkline.min.js",
                "~/js/charts/flot/jquery.flot.min.js",
                "~/js/charts/flot/jquery.flot.tooltip.min.js",
                "~/js/charts/flot/jquery.flot.resize.js",
                "~/js/charts/flot/jquery.flot.grow.js",
                "~/js/charts/flot/demo.js",
                "~/js/userdata.js",
                "~/js/realtime.js",
                "~/js/calendar/bootstrap_calendar.js",
                "~/js/calendar/demo.js",
                "~/js/sortable/jquery.sortable.js",
                "~/Scripts/toastr.js",
                "~/Scripts/jquery.raty.js",
                "~/Scripts/respond.src.js",
                "~/Scripts/ui-bootstrap-tpls-0.13.1.js",
                "~/Scripts/underscore.js",
                "~/Scripts/raphael.js",
                "~/Scripts/morris.js",
                "~/Scripts/jquery.fancybox.js",
                "~/Scripts/jquery.fancybox-media.js",
                "~/Scripts/loading-bar.js",
                        "~/Scripts/jquery.js",
                        "~/Scripts/jquery-{version}.js"  
                        ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/animate.css",
                 "~/Content/angular-material.min.css",
                 "~/Content/font-awesome.min.css",
                 "~/Content/font.css",
                 "~/Content/app.css",
                 "~/Content/custom.css",
                 "~/Content/realtime.css"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(

                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
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
                         "~/Scripts/factories/sessionFactory.js"
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
