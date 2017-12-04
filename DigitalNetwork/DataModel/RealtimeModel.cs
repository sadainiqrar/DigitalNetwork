using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalNetwork.DataModel
{
    public class RealtimeModel
    {
  
        public long total_traffic { get; set; }
        public string message { get; set; }
        public List<CountryStat> country_stats { get; set; }
        

    }

    public class CountryStat
    {
        public string country { get; set; }
        public long sessions { get; set; }

    }
}