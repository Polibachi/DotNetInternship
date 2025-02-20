namespace ServiceStaff.Server.DTO
{
    public class OrderDto
    {
        public int TableNumber { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
}
