using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/Order")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.Include(order => order.Client).ToList();
        }

        [HttpGet("api/GetOrdersByDate")]
        public List<OrderViewModel> GetOrdersByDate(DateTime firstDate, DateTime secondDate)
        {
            var orders = _context.Orders.Where(x => x.Date >= firstDate && x.Date <= secondDate)
                .Select(o => new OrderViewModel {
                    Order = new Order
                    {
                        Id = o.Id,
                        Date = o.Date,
                        Info = o.Info,
                        Payment = o.Payment,
                        Realization = o.Realization
                    },
                    Client = new Client
                    {
                        Id = o.Client.Id,
                        ClientLinks = o.Client.ClientLinks,
                        ContactPerson = o.Client.ContactPerson,
                        Info = o.Client.Info,
                        Name = o.Client.Name,
                        Phone = o.Client.Phone,
                        PhysicAddress = o.Client.PhysicAddress,
                        SecondaryPhone = o.Client.SecondaryPhone,
                        ShippingAddress = o.Client.ShippingAddress,
                        Status = o.Client.Status
                    }, 
                    OrderDetails = o.OrderDetails.Select(details => new OrderDetailsViewModel
                    {
                        Count = details.Count,
                        Id = details.Id,
                        Info = details.Product.Info,
                        Name = details.Product.Name,
                        NicotineAmount = details.Product.NicotineAmount,
                        Price = details.Price,
                        ProductId = details.ProductId,
                        Volume = details.Product.Volume
                    }).ToList()
                }).ToList();
                /*Include(order => order.Client).Include(order => order.OrderDetails).ThenInclude(details => details.Product).ToList();*/
            return orders;
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = await _context.Orders.SingleOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Entry(order).Collection(c => c.OrderDetails).Load();
            _context.OrderDetails.Include(c => c.Product).ToList();

            List<OrderDetailsViewModel> orderDetailsVM = new List<OrderDetailsViewModel>();
            foreach (OrderDetails o in order.OrderDetails.ToList())
            {
                orderDetailsVM.Add(new OrderDetailsViewModel
                {
                    Id = o.Id,
                    Count = o.Count,
                    Price = o.Price,
                    Info = o.Product.Info,
                    Name = o.Product.Name,
                    ProductId = o.ProductId,
                    NicotineAmount = o.Product.NicotineAmount,
                    Volume = o.Product.Volume
                });
            }

            var result = new GetOrderViewModel
            {
                Id = id,
                Date = order.Date,
                Info = order.Info,
                Payment = order.Payment,
                ClientId = order.ClientId,
                Realization = order.Realization,
                OrderDetails = orderDetailsVM
            };

            return Ok(result);
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder([FromRoute] int id, [FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;
            var oldOrderDetails = _context.OrderDetails.Where(x => x.OrderId == id).ToList();
            _context.OrderDetails.RemoveRange(oldOrderDetails);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            foreach (OrderDetails o in order.OrderDetails.ToList())
                _context.OrderDetails.Add(new OrderDetails { Count = o.Count, OrderId = id, Price = o.Price, ProductId = o.ProductId });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Order
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = await _context.Orders.SingleOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}