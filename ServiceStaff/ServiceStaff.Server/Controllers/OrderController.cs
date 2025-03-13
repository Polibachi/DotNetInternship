using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ServiceStaff.Server.Services;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Hubs;
using Microsoft.AspNetCore.Authorization;
using ServiceStaff.Server.Models;

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
    [HttpPut("status/{orderId}")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] string newStatus)
    {
        if (!Enum.TryParse(typeof(OrderStatus), newStatus, true, out var statusEnum))
        {
            return BadRequest("Invalid order status.");
        }

        var result = await _orderService.UpdateOrderStatusAsync(orderId, (OrderStatus)statusEnum);

        if (result.Contains("not found"))
        {
            return NotFound(result);
        }

        return Ok(result);
    }


    [Authorize]
    [HttpPut("edit/{orderId}")]
    public async Task<IActionResult> EditOrderAsync(int orderId, [FromBody] OrderUpdateDto dto)
    {
        var result = await _orderService.EditOrderAsync(orderId, dto);
        if (result == null)
            return NotFound();

        return Ok();
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStatus(OrderStatus status)
    {
        var orders = await _orderService.GetOrdersByStatusAsync(status);
        return Ok(orders);
    }


    [Authorize]
    [HttpGet("dish-order-counts")]
    public async Task<IActionResult> GetDishOrderCounts()
    {
        var result = await _orderService.GetDishOrderCountsAsync();
        return Ok(result);
    }

    [Authorize]
    [HttpGet("top-table")]
    public async Task<IActionResult> GetTopTable()
    {
        var result = await _orderService.GetTableWithMostOrdersAsync();
        return Ok(new { TableNumber = result });
    }

    [Authorize]
    [HttpGet("orders-by-date/{date}")]
    public async Task<IActionResult> GetOrdersByDate(DateTime date)
    {
        var result = await _orderService.GetTotalOrdersByDateAsync(date);
        return Ok(new { Date = date, OrderCount = result });
    }

    [Authorize]
    [HttpGet("most-popular-dish")]
    public async Task<IActionResult> GetMostPopularDish([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        var result = await _orderService.GetMostPopularDishAsync(startDate, endDate);
        return Ok(new { PopularDish = result });
    }

    [Authorize]
    [HttpGet("average-order-amount")]
    public async Task<IActionResult> GetAverageOrderAmount()
    {
        var result = await _orderService.GetAverageOrderAmountAsync();
        return Ok(new { AverageOrderAmount = result });
    }

    //мб не робоче
    [Authorize]
    [HttpGet("most-profitable-day")]
    public async Task<IActionResult> GetMostProfitableDay()
    {
        var result = await _orderService.GetMostProfitableDayAsync();
        return Ok(new { MostProfitableDay = result });
    }

    [Authorize]
    [HttpGet("orders-per-hour/{date}")]
    public async Task<IActionResult> GetOrdersPerHour(DateTime date)
    {
        var result = await _orderService.GetOrdersPerHourAsync(date);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetOrderById(int orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order == null)
        {
            return NotFound($"Order with ID {orderId} not found");
        }
        return Ok(order);
    }

}
