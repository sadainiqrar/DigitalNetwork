using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigitalNetwork.Models;

namespace DigitalNetwork.Controllers
{
    public class dataCon
    {
        public digimarketEntities1 db;
        private static dataCon j = new dataCon();
        private dataCon()
        {
            db = new digimarketEntities1();
        }

        public static dataCon DB
        {
            get
            {
                if (j==null)
                {
                    j = new dataCon();
                }
                return j;
            }
        }
    }
}