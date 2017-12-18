﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigitalNetwork.Models;

namespace DigitalNetwork.DataModel
{

    public class Admin_Article_Input : Article
    {
        public string email { get; set; }
        public string ga_id { get; set; }
    }
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

    public class getArticleBySerialNumber : getArticleBySerial_Result
    {

        public string site_name { get; set; }
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
        public string site_name { get; set; }
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


    public class trafficInput : User_Analytic_Input
    {

        public string url { get; set; }
  
        public string site_url { get; set; }
        public System.DateTime fromDate { get; set; }
        public System.DateTime toDate { get; set; }
        public string id { get; set; }
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
        public long total_traffic { get; set; }
        public long total_earning { get; set; }

        public List<CountryStats> country_stats { get; set; }
    }
    public class AdminStats:UserStats
    {
        public DateTime date { set; get; }
        public double earning { get; set; }
    }

    public class CountryStats
    {
        public string country { get; set; }
        public string sessions { get; set; }
        public string newSessions { get; set; }
    }


    public class GraphStats
    {
        public string dateTime { get; set; }
        public string sessions { get; set; }
        public double earned { get; set; }
    }



    public class user_traffic
    {
        public long premium { get; set; }
        public long non_premium { get; set; }

    }
    public class user_earned
    {
        public double premium { get; set; }
        public double non_premium { get; set; }

    }

    public class PaymentStats
    {
        public long total_traffic { get; set; }
        public long unpaid_traffic { get; set; }
        public double total_earned { get; set; }
        public double last_paid { get; set; }
        public double available { get; set; }

    }
    public class siteInput:get_all_site_Result
    {
        public string email { get; set; }
    }

    public class countrieees
    {
        public string id { get; set; }
        public string country { get; set; }
    }

    public class MapData
    {
        public string id { get; set; }
        public string value { get; set; }
    }

    public class Map
    {
        public int max { get; set; }
        public int min { get; set; }

        public int avg { get; set; }

        public List<MapData> mapData { get; set; }
    }

    public class AdminGraph
    {
        public double amount { get; set; }
        public List<GraphStats> graph { get; set; }
    }

}