using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class OrderNotificationHub : Hub
{
    public async Task SendNotification(string user, string message)
    {
        await Clients.User(user).SendAsync("ReceiveNotification", message);
    }
}
