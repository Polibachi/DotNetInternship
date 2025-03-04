namespace ServiceStaff.Server.DTO
{
    public class OrderUpdateDto
    {
        public int TableNumber { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
    public class OrderItemDto
    {
        public int DishId { get; set; }
        public int Quantity { get; set; }
    }
}
