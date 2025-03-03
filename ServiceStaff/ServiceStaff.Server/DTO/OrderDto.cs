namespace ServiceStaff.Server.DTO
{
    public class OrderDto
    {
        public int Id { get; set; } // Додаємо ідентифікатор
        public int TableNumber { get; set; }
        public DateTime CreatedAt { get; set; } // Додаємо дату створення
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
}
