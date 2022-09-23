using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace WebApplication1.Models
{
    public class CutleryContext : DbContext
    {
        public CutleryContext(DbContextOptions<CutleryContext> options)
            : base(options)
        {
        }

        public DbSet<Cutlery> Cutlery { get; set; } = null!;
    }
}
