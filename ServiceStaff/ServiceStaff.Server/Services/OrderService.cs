using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ServiceStaff.Server.Data;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Models;

namespace ServiceStaff.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateOrderAsync(OrderDto orderDto)
        {
            var order = new Order
            {
                TableNumber = orderDto.TableNumber,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                OrderItems = orderDto.OrderItems.Select(oi => new OrderItem
                {
                    DishId = oi.DishId,
                    Quantity = oi.Quantity
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return "Order created successfully";
        }

        // await _hubContext.Clients.User(order.CookId).SendAsync("ReceiveNotification", $"Нове замовлення #{order.Id}!");
        // надсилання сповіщень


        public async Task<string> CompleteOrderAsync(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return $"Order with ID {orderId} not found";
            }

            order.Status = "Completed";
            await _context.SaveChangesAsync();
            return "Order status updated to Completed";
        }
    }
}
