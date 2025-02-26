namespace ServiceStaff.Server.DTO
{
    public class RegisterDto
    {
        public string Email { get; set; }  // ✅ Замінено Username → Email
        public string Password { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
    }
}
