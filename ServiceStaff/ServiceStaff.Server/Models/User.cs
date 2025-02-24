namespace ServiceStaff.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;  // e.g., "Admin", "Waiter"
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;  // Consider hashing passwords
    }
}