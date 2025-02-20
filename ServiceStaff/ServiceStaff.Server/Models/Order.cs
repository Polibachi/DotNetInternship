namespace ServiceStaff.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int TableNumber { get; set; }
        public string Status { get; set; } = "Pending";  // e.g., "Pending", "Completed"
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<OrderItem> OrderItems { get; set; } = new();
    }

}
