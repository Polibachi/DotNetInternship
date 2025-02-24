using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ServiceStaff.Server.Services;
using ServiceStaff.Server.DTO;

[Route("api/[controller]")]
[ApiController]
public class DishController : ControllerBase
{
    private readonly IDishService _dishService;

    public DishController(IDishService dishService)
    {
        _dishService = dishService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddDish([FromBody] DishDto dishDto)
    {
        var result = await _dishService.AddDishAsync(dishDto);
        return Ok(result);
    }

    [HttpGet("{dishId}")]
    public async Task<IActionResult> GetDishById(int dishId)
    {
        var dish = await _dishService.GetDishByIdAsync(dishId);
        if (dish == null)
        {
            return NotFound($"Dish with ID {dishId} not found");
        }
        return Ok(dish);
    }
}
