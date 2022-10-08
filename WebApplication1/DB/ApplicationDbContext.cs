using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
namespace WebApplication1.DB
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Cutlery> Cutlerys { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cutlery>().HasData(
                new Cutlery
                {
                    Type = "Fork",
                    Material = "Aluminium",
                    Price = 10
                },
                new Cutlery
                {
                    Type = "Spoon",
                    Material = "Aluminium",
                    Price = 15
                },
                new Cutlery
                {
                    Type = "Spoon",
                    Material = "Gold",
                    Price = 25
                },
                new Cutlery
                {
                    Type = "Knife",
                    Material = "Platinum",
                    Price = 40
                },
                new Cutlery
                {
                    Type = "Knife",
                    Material = "Gold",
                    Price = 30
                },
                new Cutlery
                {
                    Type = "Knife",
                    Material = "Iron",
                    Price = 25
                });
        }
    }
}
