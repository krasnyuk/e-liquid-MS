using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/MainPageInfo")]
    public class MainPageInfoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MainPageInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MainPageInfo
        [HttpGet]
        public IActionResult Get()
        {
            var clients = _context.Clients.Where(client => client.Status == StatusEnum.active).Count();
            var avrOrder = _context.Orders.Average(order => order.OrderDetails.Sum( x => x.Count));
            var totalSold = _context.Orders.Sum(order => order.OrderDetails.Sum(x => x.Count));
            var totalProfit = _context.Orders.Sum(order => order.OrderDetails.Sum(x => x.Price * x.Count));
            var thisMonth = _context.Orders.Where(order => order.Date.Month == DateTime.Now.Month).Sum(order => order.OrderDetails.Sum(x => x.Count));

            var result = new MainPageInfoViewModel
            {
                ClientCount = clients,
                AverageOrder = avrOrder,
                TotalSold = totalSold,
                TotalProfit = totalProfit,
                ThisMonth = thisMonth
            };

            return Ok(result);
        }
    }
} 