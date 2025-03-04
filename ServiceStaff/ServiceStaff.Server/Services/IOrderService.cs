using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Models;

namespace ServiceStaff.Server.Services
{
    public interface IOrderService
    {
        Task<string> CreateOrderAsync(OrderDto orderDto);
        Task<string> UpdateOrderStatusAsync(int orderId, OrderStatus newStatus);
        Task<OrderDto> GetOrderByIdAsync(int orderId);
        Task<Order> EditOrderAsync(int orderId, OrderUpdateDto updatedOrder);
        Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status);

        //Рофлофункції
        Task<Dictionary<string, int>> GetDishOrderCountsAsync(); // Кількість замовлень кожної страви
        Task<int> GetTableWithMostOrdersAsync(); // Стіл із найбільшою кількістю замовлень
        Task<int> GetTotalOrdersByDateAsync(DateTime date); // Кількість замовлень за день
        Task<string> GetMostPopularDishAsync(DateTime startDate, DateTime endDate); // Найпопулярніша страва
        Task<decimal> GetAverageOrderAmountAsync(); // Середня сума замовлення
        Task<DateTime> GetMostProfitableDayAsync(); // Найприбутковіший день
        Task<Dictionary<int, int>> GetOrdersPerHourAsync(DateTime date); // Розподіл замовлень по годинах
    }
}
