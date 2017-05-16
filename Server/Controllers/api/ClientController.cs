using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Client")]
    public class ClientController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Client
        [HttpGet]
        public IEnumerable<Client> GetClients()
        {
            return _context.Clients;
        }

        // GET: api/Client/5
        [HttpGet("{id}")]
        public IActionResult GetClient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Client client = _context.Clients.SingleOrDefault(m => m.Id == id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Entry(client).Collection(c => c.ClientLinks).Load();

            return Ok(client);
        }

        // PUT: api/Client/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient([FromRoute] int id, [FromBody] PostClientViewModel client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client.Client.Id)
            {
                return BadRequest();
            }

            _context.Entry(client.Client).State = EntityState.Modified;

            var oldLinks = _context.ClientLinks.Where(x => x.ClientId == id).ToList();
            _context.ClientLinks.RemoveRange(oldLinks);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            foreach (string o in client.Links.ToList())
            {
                _context.ClientLinks.Add(new ClientLink { Link = o, ClientId = id });
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Client
        [HttpPost]
        public async Task<IActionResult> PostClient([FromBody] PostClientViewModel client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clients.Add(client.Client);
            await _context.SaveChangesAsync();

            foreach (string o in client.Links)
                _context.ClientLinks.Add(new ClientLink { ClientId = client.Client.Id, Link = o });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = client.Client.Id }, client);
        }

        // DELETE: api/Client/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var client = await _context.Clients.SingleOrDefaultAsync(m => m.Id == id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }
    }
}