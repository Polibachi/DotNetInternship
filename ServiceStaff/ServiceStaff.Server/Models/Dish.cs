namespace ServiceStaff.Server.Models;
public class Dish
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public string Description { get; set; } = null!;

    public List<OrderItem> OrderItems { get; set; } = new();
}

