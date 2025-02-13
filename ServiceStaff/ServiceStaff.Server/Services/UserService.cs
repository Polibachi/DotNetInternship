using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Models;

namespace ServiceStaff.Server.Services
{
    public class UserService : IUserService
    {
        private readonly List<User> _users = new List<User>();

        public async Task<string> RegisterAsync(RegisterDto registerDto)
        {
            var user = new User { Username = registerDto.Username, Password = registerDto.Password };
            _users.Add(user);
            return "User registered successfully";
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
            var user = _users.FirstOrDefault(u => u.Username == loginDto.Username && u.Password == loginDto.Password);
            if (user == null) return "Invalid credentials";

            var token = GenerateJwtToken(user);
            return token;
        }
        public bool UserExists(string username)
        {
            return _users.Any(u => u.Username == username);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("your_secret_key_here");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
