using Microsoft.EntityFrameworkCore;
using WebApplication1.DB;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Providers
{
    public class DataProvider : IDataProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public DataProvider(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Cutlery>> GetCutlerys()
        {
            var cutlerys = await _dbContext.Cutlerys.ToListAsync();

            return cutlerys;
        }

        public async Task<Cutlery> GetCutleryById(int id)
        {
            var cutlery = await _dbContext.Cutlerys.FirstOrDefaultAsync(x => x.Id == id);

            return cutlery;
        }

        public async Task<int> AddCutlery(Cutlery cutlery)
        {
            await _dbContext.Cutlerys.AddAsync(cutlery);
            int quanOfAddedCutlerys = await _dbContext.SaveChangesAsync();

            Console.WriteLine(quanOfAddedCutlerys);

            return quanOfAddedCutlerys;
        }

        public async Task<int> EditCutlery(Cutlery cutlery)
        {
            _dbContext.Update(cutlery);
            int quanOfChangedCutlerys = await _dbContext.SaveChangesAsync();

            return quanOfChangedCutlerys;
        }

        public async Task<int> DeleteCutlery(Cutlery cutlery)
        {
            _dbContext.Cutlerys.Remove(cutlery);
            int quanOfDeletedCutlerys = await _dbContext.SaveChangesAsync();

            return quanOfDeletedCutlerys;
        }
    }
}
