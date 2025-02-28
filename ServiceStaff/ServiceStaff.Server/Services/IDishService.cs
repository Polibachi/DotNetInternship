using ServiceStaff.Server.DTO;

public interface IDishService
{
    Task<string> AddDishAsync(DishDto dishDto);
    Task<DishDto> GetDishByIdAsync(int dishId);
    Task<List<DishDto>> GetAllDishesAsync();
}
