namespace ServiceStaff.Server.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int TableNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Comment { get; set; } // Нове поле
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }

}
