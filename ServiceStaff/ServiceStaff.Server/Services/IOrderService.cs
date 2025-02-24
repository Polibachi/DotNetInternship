using ServiceStaff.Server.DTO;

namespace ServiceStaff.Server.Services
{
    public interface IOrderService
    {
        Task<string> CreateOrderAsync(OrderDto orderDto);
        Task<string> CompleteOrderAsync(int orderId);
    }
}
