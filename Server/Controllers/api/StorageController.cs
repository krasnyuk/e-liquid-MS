using System;
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
    [Route("api/Storage")]
    public class StorageController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StorageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Storage
        [HttpGet]
        public IEnumerable<Storage> GetStorages()
        {
            return _context.Storages;
        }

        // GET: api/Storage/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStorage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var storage = await _context.Storages.SingleOrDefaultAsync(m => m.Id == id);

            if (storage == null)
            {
                return NotFound();
            }

            _context.Entry(storage).Collection(c => c.StorageDetails).Load();

            List<StorageDetailsViewModel> storageDetailsVM = new List<StorageDetailsViewModel>();
            foreach (StorageDetails o in storage.StorageDetails.ToList())
            {
                storageDetailsVM.Add(new StorageDetailsViewModel
                {
                    Id = o.Id,
                    Count = o.Count,
                    ProductId = o.ProductId
                });
            }

            var result = new GetStorageViewModel
            {
                Id = id,
                Date = storage.Date,
                TotalCount = storage.TotalCount,
                StorageDetails = storageDetailsVM
            };

            return Ok(result);
        }

        // PUT: api/Storage/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStorage([FromRoute] int id, [FromBody] Storage storage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != storage.Id)
            {
                return BadRequest();
            }

            _context.Entry(storage).State = EntityState.Modified;
            var oldStorageDetails = _context.StorageDetails.Where(x => x.StorageId == id).ToList();
            _context.StorageDetails.RemoveRange(oldStorageDetails);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StorageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            foreach (StorageDetails o in storage.StorageDetails.ToList())
                _context.StorageDetails.Add(new StorageDetails { Count = o.Count, StorageId = id, ProductId = o.ProductId });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Storage
        [HttpPost]
        public async Task<IActionResult> PostStorage([FromBody] Storage storage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Storages.Add(storage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStorage", new { id = storage.Id }, storage);
        }

        // DELETE: api/Storage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStorage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var storage = await _context.Storages.SingleOrDefaultAsync(m => m.Id == id);
            if (storage == null)
            {
                return NotFound();
            }

            _context.Storages.Remove(storage);
            await _context.SaveChangesAsync();

            return Ok(storage);
        }

        private bool StorageExists(int id)
        {
            return _context.Storages.Any(e => e.Id == id);
        }
    }
}