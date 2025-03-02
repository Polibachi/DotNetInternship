using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ServiceStaff.Server.Hubs
{
    public class OrderNotificationHub : Hub
    {
        public async Task SendOrderNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveOrderNotification", message);
        }
    }
}
