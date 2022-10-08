using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Interfaces
{
    public interface IDataProvider
    {
        public Task<List<Cutlery>> GetCutlerys();

        public Task<Cutlery> GetCutleryById(int id);

        public Task<int> AddCutlery(Cutlery cutlery);

        public Task<int> EditCutlery(Cutlery cutlery);

        public Task<int> DeleteCutlery(Cutlery cutlery);
    }
}
