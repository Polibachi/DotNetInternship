using System.Text.Json.Serialization;

namespace ServiceStaff.Server.Models
{
    public enum OrderStatus
    {
        Pending = 0,    // Прийнятий
        InProgress = 1, // Виконується
        Completed = 2,  // Виконаний
        Canceled = 3    // Скасований
    }



    public class Order
    {
        public int Id { get; set; }
        public int TableNumber { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;  // e.g., "Pending", "Completed"
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public List<OrderItem> OrderItems { get; set; } = new();
    }

}
