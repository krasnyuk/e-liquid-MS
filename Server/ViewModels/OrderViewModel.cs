using AspNetCoreSpa.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class OrderViewModel
    {
        public Order Order {get; set;}

        public List<OrderDetailsViewModel> OrderDetails { get; set; }

        public Client Client { get; set; }

    }
}
