using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CutleriesController : ControllerBase
    {
        private readonly CutleryContext _context;

        public CutleriesController(CutleryContext context)
        {
            _context = context;
        }

        // GET: api/Cutleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cutlery>>> GetCutlery()
        {
            return await _context.Cutlery.ToListAsync();
        }

        // GET: api/Cutleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cutlery>> GetCutlery(long id)
        {
            var cutlery = await _context.Cutlery.FindAsync(id);

            if (cutlery == null)
            {
                return NotFound();
            }

            return cutlery;
        }

        // PUT: api/Cutleries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCutlery(long id, Cutlery cutlery)
        {
            if (id != cutlery.Id)
            {
                return BadRequest();
            }

            _context.Entry(cutlery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CutleryExists(id))
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

        

        // POST: api/Cutleries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cutlery>> PostCutlery(Cutlery cutlery)
        {
            _context.Cutlery.Add(cutlery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCutlery", new { id = cutlery.Id }, cutlery);
            //return CreatedAtAction(nameof(GetCutlery), new { id = cutlery.Id }, cutlery);
        }

        // DELETE: api/Cutleries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCutlery(long id)
        {
            var cutlery = await _context.Cutlery.FindAsync(id);
            if (cutlery == null)
            {
                return NotFound();
            }

            _context.Cutlery.Remove(cutlery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CutleryExists(long id)
        {
            return _context.Cutlery.Any(e => e.Id == id);
        }
    }
}
