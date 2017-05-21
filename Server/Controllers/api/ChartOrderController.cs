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
    [Route("api/ChartOrder")]
    public class ChartOrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChartOrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ChartOrder
        [HttpGet]
        public IEnumerable<OrderChartViewModel> Get()
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
    }
}
