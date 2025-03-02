using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ServiceStaff.Server.Services;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Hubs;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IHubContext<OrderNotificationHub> _hubContext;

    public OrderController(IOrderService orderService, IHubContext<OrderNotificationHub> hubContext)
    {
        _orderService = orderService;
        _hubContext = hubContext;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
    {
        var result = await _orderService.CreateOrderAsync(orderDto);

        if (result != null)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification",
                $"Нове замовлення на стіл #{orderDto.TableNumber}!");
        }

        return Ok(result);
    }

    [Authorize]
    [HttpPut("complete/{orderId}")]
    public async Task<IActionResult> CompleteOrder(int orderId)
    {
        var result = await _orderService.CompleteOrderAsync(orderId);
        if (result.Contains("not found"))
        {
            return NotFound(result);
        }

        await _hubContext.Clients.All.SendAsync("ReceiveNotification",
            $"Замовлення #{orderId} виконано!");

        return Ok(result);
    }
}
