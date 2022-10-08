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

        private static readonly string[] TypeList = new[]
        {
        "Fork", "Spoon", "Knife"
        };

        private static readonly string[] MaterialList = new[]
        {
        "Aluminium", "Gold", "Platinum", "Iron"
        };

        public CutleriesController(CutleryContext context)
        {
            _context = context;
        }

        private readonly ILogger<CutleriesController> _logger;

        public CutleriesController(ILogger<CutleriesController> logger)
        {
            _logger = logger;
        }

        // GET: api/Cutleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cutlery>>> GetCutlery()
        {
            //return await _context.Cutlery.ToListAsync();
            return Enumerable.Range(1, 5).Select(index => new Cutlery
            {
                Id = new(),
                Type = TypeList[Random.Shared.Next(TypeList.Length)],
                Material = MaterialList[Random.Shared.Next(MaterialList.Length)]
            })
            .ToArray();
        }

        // GET: api/Cutleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cutlery>> GetCutlery(int id)
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
        public async Task<IActionResult> PutCutlery(int id, Cutlery cutlery)
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
        public async Task<IActionResult> DeleteCutlery(int id)
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

        private bool CutleryExists(int id)
        {
            return _context.Cutlery.Any(e => e.Id == id);
        }
    }
}
