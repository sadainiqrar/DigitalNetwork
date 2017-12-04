using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using DigitalNetwork.Models;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.Hosting;
using DigitalNetwork.DataModel;
using DigitalNetwork.Controllers;

namespace DigitalNetwork.Scheduler
{
    public class RealtimeEngine
    {
        private IHubContext _hubs;
        private readonly int _pollIntervalMillis;


        public RealtimeEngine(int pollIntervalMillis)
        {
            //HostingEnvironment.RegisterObject(this);
            _hubs = GlobalHost.ConnectionManager.GetHubContext<RealtimeHub>();
            _pollIntervalMillis = pollIntervalMillis;
        }

        public async Task OnDataMonitor()
        {
            Dictionary<string, RealtimeModel> data = new Dictionary<string, RealtimeModel>();
        
            //Monitor for infinity!
            while (true)
            {
                await Task.Delay(_pollIntervalMillis);

                //List of performance models that is loaded up on every itteration.
                data = statistics();
                
                _hubs.Clients.All.broadcastData(data);
      
            }
            
        }


        public Dictionary<string, RealtimeModel> statistics()
        {
            List<getAllUser_Result> users = new List<getAllUser_Result>();
            digimarketEntities1 db = new digimarketEntities1();
            using (var data = db.getAllUser())
            {
                users = data.ToList<getAllUser_Result>();
            }
            Dictionary<string, RealtimeModel> realtimeList = new Dictionary<string, RealtimeModel>();
            foreach (var user in users)
            {
                TrafficController trafficController = new TrafficController();
                //List < List < UserStats >> total_stats = new List<List<UserStats>>();

                RealtimeModel final = new RealtimeModel() { total_traffic = 0, message = "BackEnd Task for" + user.fullname, country_stats = new List<CountryStat>() };

                List<get_user_traffic_Result> res = trafficController.get_all_sites(user.uid);
                foreach (var item in res)
                {

                    Authorization auth = new Authorization(item.email);
                    var result = auth.service.Data.Realtime.Get("ga:" + item.ga_id, "rt:activeUsers");
                    result.Dimensions = "rt:country";
                    result.Filters = "ga:campaign=@" + user.username;
                    var response = result.Execute();
                    if (response.TotalResults != 0)
                    {
                        final.total_traffic = final.total_traffic + Int64.Parse(response.TotalsForAllResults["rt:activeUsers"]);
                        foreach (var row in response.Rows)
                        {
                            // UserStats temp = user_stats.Last<UserStats>();

                            CountryStat cStats = new CountryStat();

                            cStats = final.country_stats.FirstOrDefault(x => x.country == row[0]);


                            if (cStats == null)
                            {
                                cStats = new CountryStat() { country = row[0], sessions = Int64.Parse(row[1]) };
                                final.country_stats.Add(cStats);
                            }
                            else
                            {
                                final.country_stats.Remove(cStats);
                                cStats.sessions = cStats.sessions + Int64.Parse(row[1]);
                                final.country_stats.Add(cStats);

                            }
                        }
                    }
                }
                realtimeList.Add(user.uid, final);
            }
            return realtimeList;
        }
        public void Stop(bool immediate)
        {

            //HostingEnvironment.UnregisterObject(this);
        }
        
    }

}