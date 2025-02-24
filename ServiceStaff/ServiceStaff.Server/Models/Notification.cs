namespace ServiceStaff.Server.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public int ToUserId { get; set; }
        public User ToUser { get; set; } = null!;

        public string Message { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool ReadStatus { get; set; } = false;  // false = unread, true = read
    }

}
