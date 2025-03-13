using Microsoft.AspNetCore.Mvc;
using ServiceStaff.Server.DTO;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class DishController : ControllerBase
{
    private readonly IDishService _dishService;

    public DishController(IDishService dishService)
    {
        _dishService = dishService;
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddDish([FromBody] DishDto dishDto)
    {
        var result = await _dishService.AddDishAsync(dishDto);
        return Ok(result);
    }

    [AllowAnonymous]
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

    [AllowAnonymous]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllDishes()
    {
        var dishes = await _dishService.GetAllDishesAsync();
        return Ok(dishes);
    }

}
