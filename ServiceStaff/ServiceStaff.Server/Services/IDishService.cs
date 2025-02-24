using System.Threading.Tasks;
using ServiceStaff.Server.DTO;

namespace ServiceStaff.Server.Services
{
    public interface IDishService
    {
        Task<string> AddDishAsync(DishDto dishDto);
        Task<DishDto> GetDishByIdAsync(int dishId);
    }
}
