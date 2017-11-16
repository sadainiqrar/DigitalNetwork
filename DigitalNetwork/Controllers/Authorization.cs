using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Google.Apis.Discovery;
using Google.Apis.Analytics.v3;
using Google.Apis.Util.Store;
using Google.Apis.Services;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Google.Apis.Analytics.v3.Data;
using Google.Apis.Auth.OAuth2;
using System.Threading;

namespace DigitalNetwork.Controllers
{
    public class Authorization
    {
        public AnalyticsService service;
      
        public Authorization(string email)
        { 
            Task <AnalyticsService> task = Task.Run<AnalyticsService>(async () => await RunAsync(email));
            service= task.Result;
        }

     
    
    public  async Task<AnalyticsService> RunAsync(string email)
        {  
            var clientId = "122077380940-vn0cl0ece9gk4bcc40nrnlhpki93dsc5.apps.googleusercontent.com";
            var clientSecret = "top5xI1-65DS8KwgD4OQJHkI";



            UserCredential credential;
            credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        new ClientSecrets
        {
            ClientId = clientId,
            ClientSecret = clientSecret
        },
    new[] { AnalyticsService.Scope.Analytics, AnalyticsService.Scope.AnalyticsReadonly },
    email,
    CancellationToken.None,
    new FileDataStore("account.users"));

            // Create the service.
            var _service = new AnalyticsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "digitalnetwork-182506",
                ApiKey = "AIzaSyDvURFxjBImiFEEsJjNunfVSvbrRP1u9yA",
            });

            return _service;
        }
    }
}