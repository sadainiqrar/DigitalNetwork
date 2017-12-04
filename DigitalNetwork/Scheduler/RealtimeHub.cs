using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using DigitalNetwork.DataModel;
using System.Threading.Tasks;

namespace DigitalNetwork.Scheduler
{
    public class RealtimeHub : Hub
    {
        public void SendData(Dictionary<string,RealtimeModel> realtimeData)
        {
            Clients.All.broadcastData(realtimeData);
        }

        public void Heartbeat()
        {
            Clients.All.heartbeat();
        }

        public override Task OnConnected()
        {
            return (base.OnConnected());
        }
    }
}