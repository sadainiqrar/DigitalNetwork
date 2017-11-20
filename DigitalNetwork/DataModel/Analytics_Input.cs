using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalNetwork.DataModel
{
    public class Analytics_Input
    {
        public Analytics_Input()
        {
            this.campaign = "ga:campaign";
            this.session = "ga:sessions";
            this.pageViews = "ga:pageViews";
            this.landing_page_path = "ga:landingPagePath";
            this.country = "ga:country";
        }
        public string ga_id { get; set; }
        public string from_date { get; set; }
        public string to_date { get; set; }
        public string session { get; set; }
        public string pageViews { get; set; }
        public string campaign { get; set; }
        public string landing_page_path { get; set; }
        public string country { get; set; }
        public string extra { get; set; }
    }


    public class User_Analytic_Input
    {
        public User_Analytic_Input()
        {
            this.campaign = "ga:campaign";
            this.session = "ga:sessions";
            this.pageViews = "ga:pageViews";
            this.landing_page_path = "ga:landingPagePath";
            this.country = "ga:country";
        }
        public string uid { get; set; }

        public string from_date { get; set; }
        public string to_date { get; set; }
        public string session { get; set; }
        public string pageViews { get; set; }
        public string campaign { get; set; }
        public string landing_page_path { get; set; }
        public string country { get; set; }
        public string extra { get; set; }
    }
    public class get_Articles
    {
        public int serial_no { get; set; }
        public int a_id { get; set; }
        public string url { get; set; }
        public bool status { get; set; }
        public string title { get; set; }
        public string summary { get; set; }
        public string photo_url { get; set; }
        public System.DateTime modified_date { get; set; }
        public string site_url { get; set; }
        public string category { get; set; }
        public string sub_category { get; set; }
        public bool custom { get; set; }
        public bool copied { get; set; }
        public bool shared { get; set; }

        public string views { get; set; }

        public long? shares { get; set; }

    }
    public class shared_input
    {
        public string url { get; set; }
        public System.DateTime modified_date { get; set; }
        public string site_url { get; set; }
        public string username { get; set; }


    }
    public class view_share
    {

        public string views { get; set; }
        public int? shares { get; set; }
    }


    public class UserStats
    {
        public string day { get; set; }
        public long premium { get; set; }
        public long non_premium { get; set; }

        public List<CountryStats> country_stats { get; set; }
    }

    public class CountryStats
    {
        public string country { get; set; }
        public string sessions { get; set; }
        public string newSessions { get; set; }
    }

    public class user_traffic
    {
        public long premium { get; set; }
        public long non_premium { get; set; }

    }
}