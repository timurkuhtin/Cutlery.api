using WebApplication1.Models;
using WebApplication1.ViewModels;

namespace WebApplication1.Interfaces
{
    public interface ICutleryService
    {
        public Task<List<Cutlery>> GetCutlerys();

        public Task<Cutlery> GetCutleryById(int id);

        public Task AddCutlery(CutleryViewModel cutleryModel);

        public Task EditCutleryById(int id, CutleryViewModel cutleryModel);

        public Task DeleteCutleryById(int id);
    }
}
