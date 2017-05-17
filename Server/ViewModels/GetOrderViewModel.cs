using System;
using System.Collections.Generic;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class GetOrderViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Info { get; set; }
        public bool Realization { get; set; }
        public bool Payment { get; set; }
        public int ClientId { get; set; }


        public List<OrderDetailsViewModel> OrderDetails { get; set; }
    }
}
