using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ServiceStaff.Server.Data;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Hubs;
using ServiceStaff.Server.Models;

namespace ServiceStaff.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<OrderNotificationHub> _hubContext;

        public OrderService(AppDbContext context, IHubContext<OrderNotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<string> CreateOrderAsync(OrderDto orderDto)
        {
            var order = new Order
            {
                TableNumber = orderDto.TableNumber,
                Status = OrderStatus.Pending,
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

        public async Task<string> UpdateOrderStatusAsync(int orderId, OrderStatus newStatus)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return $"Order with ID {orderId} not found";
            }

            order.Status = newStatus;
            await _context.SaveChangesAsync();

            string statusMessage = newStatus switch
            {
                OrderStatus.Pending => "прийняте",
                OrderStatus.InProgress => "у процесі виконання",
                OrderStatus.Completed => "виконане",
                OrderStatus.Canceled => "скасоване",
                OrderStatus.Paid => "оплачено",
                _ => "оновлене"
            };

            await _hubContext.Clients.All.SendAsync("ReceiveNotification", new
            {
                Id = orderId,
                Status = statusMessage,
                Message = $"Замовлення #{orderId} {statusMessage}!"
            });


            return $"Order {orderId} status updated to {newStatus}";
        }

        public async Task<Order> EditOrderAsync(int orderId, OrderUpdateDto dto)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
                return null;

            // Оновлюємо номер столу
            order.TableNumber = dto.TableNumber;

            // Видаляємо всі старі OrderItem для цього замовлення
            _context.OrderItems.RemoveRange(order.OrderItems);

            // Додаємо нові OrderItem
            var newItems = dto.OrderItems.Select(i => new OrderItem
            {
                OrderId = orderId,
                DishId = i.DishId,
                Quantity = i.Quantity
            }).ToList();

            _context.OrderItems.AddRange(newItems);
            await _context.SaveChangesAsync();

            return order;
        }



        public async Task<OrderDto> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems) // Підтягуємо OrderItems
                .ThenInclude(oi => oi.Dish) // Підтягуємо Dish для назв страв
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return null;
            }

            return new OrderDto
            {
                Id = order.Id,
                TableNumber = order.TableNumber,
                CreatedAt = order.CreatedAt,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    DishId = oi.DishId,
                    Quantity = oi.Quantity
                }).ToList()
            };
        }

        public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status)
        {
            return await _context.Orders
                .Where(o => o.Status == status)
                .ToListAsync();
        }


        // 1. Кількість замовлень кожної страви
        public async Task<Dictionary<string, int>> GetDishOrderCountsAsync()
        {
            return await _context.OrderItems
                .GroupBy(oi => oi.DishId)
                .Select(g => new { DishId = g.Key, Count = g.Sum(oi => oi.Quantity) })
                .Join(_context.Dishes, oi => oi.DishId, d => d.Id, (oi, d) => new { d.Name, oi.Count })
                .ToDictionaryAsync(x => x.Name, x => x.Count);
        }

        // 2. Стіл із найбільшою кількістю замовлень
        public async Task<int> GetTableWithMostOrdersAsync()
        {
            return await _context.Orders
                .GroupBy(o => o.TableNumber)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefaultAsync();
        }

        // 3. Кількість замовлень за певний день
        public async Task<int> GetTotalOrdersByDateAsync(DateTime date)
        {
            return await _context.Orders
                .Where(o => o.CreatedAt.Date == date.Date)
                .CountAsync();
        }

        // 4. Найпопулярніша страва за певний період
        public async Task<string> GetMostPopularDishAsync(DateTime startDate, DateTime endDate)
        {
            var result = await _context.OrderItems
                .Where(oi => _context.Orders
                    .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate)
                    .Select(o => o.Id)
                    .Contains(oi.OrderId))
                .GroupBy(oi => oi.DishId)
                .OrderByDescending(g => g.Sum(oi => oi.Quantity))
                .Select(g => new { DishId = g.Key, Count = g.Sum(oi => oi.Quantity) })
                .Join(_context.Dishes, oi => oi.DishId, d => d.Id, (oi, d) => new { d.Name, oi.Count })
                .FirstOrDefaultAsync();

            return result?.Name ?? "No data";
        }

        // 5. Середня сума замовлення
        public async Task<decimal> GetAverageOrderAmountAsync()
        {
            return await _context.Orders
                .Select(o => o.OrderItems.Sum(oi => oi.Quantity * oi.Dish.Price))
                .DefaultIfEmpty(0)
                .AverageAsync();
        }

        // 6. Найприбутковіший день
        public async Task<DateTime> GetMostProfitableDayAsync()
        {
            return await _context.Orders
                .GroupBy(o => o.CreatedAt.Date)
                .OrderByDescending(g => g.Sum(o => o.OrderItems.Sum(oi => oi.Quantity * oi.Dish.Price)))
                .Select(g => g.Key)
                .FirstOrDefaultAsync();
        }

        // 7. Розподіл замовлень по годинах
        public async Task<Dictionary<int, int>> GetOrdersPerHourAsync(DateTime date)
        {
            return await _context.Orders
                .Where(o => o.CreatedAt.Date == date.Date)
                .GroupBy(o => o.CreatedAt.Hour)
                .Select(g => new { Hour = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Hour, x => x.Count);
        }
    }
}
