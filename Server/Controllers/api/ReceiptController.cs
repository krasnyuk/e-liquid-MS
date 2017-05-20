using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/Receipt")]
    public class ReceiptController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReceiptController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Receipt
        [HttpGet]
        public IEnumerable<Receipt> GetReceipts()
        {
            return _context.Receipts.Include(flavour => flavour.ReceiptFlavours).ThenInclude(f => f.Flavour).ToList();
        }

        // GET: api/Receipt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReceipt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var receipt = await _context.Receipts.SingleOrDefaultAsync(m => m.Id == id);

            if (receipt == null)
            {
                return NotFound();
            }

            _context.Entry(receipt).Collection(c => c.ReceiptFlavours).Load();
            _context.ReceiptFlavours.Include(c => c.Flavour).ToList();

            List<ReceiptFlavoursViewModel> receiptFlavoursVM = new List<ReceiptFlavoursViewModel>();
            foreach (ReceiptFlavours o in receipt.ReceiptFlavours.ToList())
            {
                receiptFlavoursVM.Add(new ReceiptFlavoursViewModel
                {
                    Id = o.Id,
                    Percent = o.Percent,
                    FlavourId = o.FlavourId,
                    Manufacturer = o.Flavour.Manufacturer,
                    Title = o.Flavour.Title
                });
            }

            var result = new GetReceiptViewModel
            {
                Id = id,
                Title = receipt.Title,
                NicotinePercent = receipt.NicotinePercent,
                PgPercent = receipt.PgPercent,
                VgPercent = receipt.VgPercent,
                ReceiptFlavours = receiptFlavoursVM
            };

            return Ok(result);
        }

        // PUT: api/Receipt/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceipt([FromRoute] int id, [FromBody] Receipt receipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != receipt.Id)
            {
                return BadRequest();
            }

            _context.Entry(receipt).State = EntityState.Modified;
            var oldReceiptFlavours = _context.ReceiptFlavours.Where(x => x.ReceiptId == id).ToList();
            _context.ReceiptFlavours.RemoveRange(oldReceiptFlavours);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceiptExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            foreach (ReceiptFlavours o in receipt.ReceiptFlavours.ToList())
                _context.ReceiptFlavours.Add(new ReceiptFlavours { Percent = o.Percent, ReceiptId = id, FlavourId = o.FlavourId });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Receipt
        [HttpPost]
        public async Task<IActionResult> PostReceipt([FromBody] Receipt receipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Receipts.Add(receipt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceipt", new { id = receipt.Id }, receipt);
        }

        // DELETE: api/Receipt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceipt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var receipt = await _context.Receipts.SingleOrDefaultAsync(m => m.Id == id);
            if (receipt == null)
            {
                return NotFound();
            }

            _context.Receipts.Remove(receipt);
            await _context.SaveChangesAsync();

            return Ok(receipt);
        }

        private bool ReceiptExists(int id)
        {
            return _context.Receipts.Any(e => e.Id == id);
        }
    }
}