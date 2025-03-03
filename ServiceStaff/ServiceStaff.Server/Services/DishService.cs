using ServiceStaff.Server.Data;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Models;
using Microsoft.EntityFrameworkCore;
namespace ServiceStaff.Server.Services
{
    public class DishService : IDishService
    {
        private readonly AppDbContext _context;

        public DishService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> AddDishAsync(DishDto dishDto)
        {
            var dish = new Dish
            {
                Name = dishDto.Name,
                Price = dishDto.Price,
                Description = dishDto.Description
            };

            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();
            return "Dish added successfully";
        }

        public async Task<DishDto> GetDishByIdAsync(int dishId)
        {
            var dish = await _context.Dishes.FindAsync(dishId);
            if (dish == null)
            {
                return null;
            }

            return new DishDto
            {
                Id = dish.Id,
                Name = dish.Name,
                Price = dish.Price,
                Description = dish.Description
            };
        }

        public async Task<List<DishDto>> GetAllDishesAsync()
        {
            var dishes = await _context.Dishes.ToListAsync();

            return dishes.Select(dish => new DishDto
            {
                Id = dish.Id,
                Name = dish.Name,
                Price = dish.Price,
                Description = dish.Description
            }).ToList();
        }

    }


}
