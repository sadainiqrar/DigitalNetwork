using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalNetwork.DataModel
{
    public class Analytics_Input
    {

        public string ga_id { get; set; }
        public string from_date { get; set; }
        public string to_date { get; set; }
        public string metrics { get; set; }
        public string session { get; set; }
        public string campaign { get; set; }
        public string landing_page_path { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string  extra{ get; set; }
    }
}