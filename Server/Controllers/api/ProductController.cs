using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreSpa.Server.Controllers.api
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ProductController : BaseController
    {
        private readonly ApplicationDbContext _context;
     //   private List<Product> _products;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
           // _products = AllProducts.PRODUCTS;
        }

        // GET: api/Product

        [HttpGet]
        public IActionResult Products()
        {
            var products = _context.Products.ToList();

            return Ok(products);
        }

        /*[HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _products;
        }*/

        /*[HttpGet("{id}")]
        public Product GetProduct([FromRoute]int id)
        {
            return _products.FirstOrDefault(x => x.Id == id);
        }

        [HttpPut("{id}")]
        public IActionResult PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            var productToEdit = _products.FirstOrDefault(p => p.Id == id);
            var index = _products.IndexOf(productToEdit);

            if (index > -1)
            {
                _products[index] = product;
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult PostProduct([FromBody] Product product)
        {
            product.Id = _products.Count + 1;

            _products.Add(product);

            return Ok(product);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct([FromRoute] int id)
        {
            _products.Remove(_products.FirstOrDefault(p => p.Id == id));

            return Ok();
        }*/

    }
}
