using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Server.Entities;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Authorize]
    public class ChartController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Charts/Order
        [HttpGet]
        [Route("api/Charts/Order")]
        public IEnumerable<OrderChartViewModel> GetOrders()
        {
            var orders = _context.Orders.ToList();
            _context.Orders.Include(c => c.OrderDetails).ToList();
            List<OrderChartViewModel> orderChartsVM = new List<OrderChartViewModel>();
            foreach (Order o in orders)
            {
                orderChartsVM.Add(new OrderChartViewModel
                {
                    Count = o.OrderDetails.Sum(x => x.Count),
                    Date = o.Date
                });
            }
            return orderChartsVM;
        }

        // GET: api/Charts/Product
        [HttpGet]
        [Route("api/Charts/Product")]
        public IEnumerable<ProductChartViewModel> GetProducts()
        {
            var totalSold = _context.Orders.Sum(order => order.OrderDetails.Sum(x => x.Count));
            var products = _context.Products.ToList();
            _context.Products.Include(c => c.OrderDetails).ToList();

            List<ProductChartViewModel> productChartVm = new List<ProductChartViewModel>();
            foreach (Product o in products)
            {
                productChartVm.Add(new ProductChartViewModel
                {
                    Name = o.Name + " " + o.Volume + " мл " + o.NicotineAmount + " мг",
                    Percent = (double)o.OrderDetails.Sum(x => x.Count) / totalSold * 100
                });
            }
            return productChartVm;
        }
    }
}
