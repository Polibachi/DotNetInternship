using System.Threading.Tasks;
using ServiceStaff.Server.DTO;

namespace ServiceStaff.Server.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterDto registerDto);
        Task<string> LoginAsync(LoginDto loginDto);
        bool UserExists(string email);
    }
}
