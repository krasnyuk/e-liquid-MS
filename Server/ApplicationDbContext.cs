using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;

namespace AspNetCoreSpa.Server
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<ContentText> ContentText { get; set; }
      
        public DbSet<Client> Clients { get; set; }
        public DbSet<ClientLink> ClientLinks { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Shipping> Shipping { get; set; }
        public DbSet<Storage> Storage { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptDetails> ReceiptDetails { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
