using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ServiceStaff.Server.DTO;
using ServiceStaff.Server.Services;

namespace ServiceStaff.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (_userService.UserExists(registerDto.Username))
            {
                return Conflict(new { message = "Username already exists" });
            }
            var result = await _userService.RegisterAsync(registerDto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var token = await _userService.LoginAsync(loginDto);
            if (token == "Invalid credentials") return Unauthorized(token);
            return Ok(new { Token = token });
        }
    }
}
