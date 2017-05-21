using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Authorization;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/Flavour")]
    public class FlavourController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FlavourController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Flavour
        [HttpGet]
        public IEnumerable<Flavour> GetFlavours()
        {
            return _context.Flavours;
        }

        // GET: api/Flavour/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFlavour([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var flavour = await _context.Flavours.SingleOrDefaultAsync(m => m.Id == id);

            if (flavour == null)
            {
                return NotFound();
            }

            return Ok(flavour);
        }

        // PUT: api/Flavour/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlavour([FromRoute] int id, [FromBody] Flavour flavour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flavour.Id)
            {
                return BadRequest();
            }

            _context.Entry(flavour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlavourExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flavour
        [HttpPost]
        public async Task<IActionResult> PostFlavour([FromBody] Flavour flavour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Flavours.Add(flavour);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlavour", new { id = flavour.Id }, flavour);
        }

        // DELETE: api/Flavour/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlavour([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var flavour = await _context.Flavours.SingleOrDefaultAsync(m => m.Id == id);
            if (flavour == null)
            {
                return NotFound();
            }

            _context.Entry(flavour).Collection(c => c.ReceiptFlavours).Load();
            if (flavour.ReceiptFlavours.Count != 0)
            {
                ModelState.AddModelError("Existing", "Ароматизатор используется в рецептах! Измените данные, перед тем как удалить данный элемент.");
                return BadRequest(ModelState);
            }

            _context.Flavours.Remove(flavour);
            await _context.SaveChangesAsync();

            return Ok(flavour);
        }

        private bool FlavourExists(int id)
        {
            return _context.Flavours.Any(e => e.Id == id);
        }
    }
}