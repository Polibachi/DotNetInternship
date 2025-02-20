using Microsoft.EntityFrameworkCore;
using ServiceStaff.Server.Models;

namespace ServiceStaff.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

     
        public DbSet<User> Users { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Додайте конфігурації моделей, якщо необхідно
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Dish)
                .WithMany(d => d.OrderItems)
                .HasForeignKey(oi => oi.DishId);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Order)
                .WithMany()
                .HasForeignKey(n => n.OrderId);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.ToUser)
                .WithMany()
                .HasForeignKey(n => n.ToUserId);
        }
    }
}
