using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ServiceStaff.Server.Services;
using ServiceStaff.Server.DTO;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
    {
        var result = await _orderService.CreateOrderAsync(orderDto);
        return Ok(result);
    }

    [HttpPut("complete/{orderId}")]
    public async Task<IActionResult> CompleteOrder(int orderId)
    {
        var result = await _orderService.CompleteOrderAsync(orderId);
        if (result.Contains("not found"))
        {
            return NotFound(result);
        }
        return Ok(result);

    }
}
