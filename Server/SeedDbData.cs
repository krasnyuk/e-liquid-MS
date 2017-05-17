using System;
using System.Collections.Generic;
using System.Linq;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.Server
{
    public class SeedDbData
    {
        readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _hostingEnv;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public SeedDbData(IWebHost host, ApplicationDbContext context)
        {
            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));
            var serviceScope = services.CreateScope();
            _hostingEnv = serviceScope.ServiceProvider.GetService<IHostingEnvironment>();
            _roleManager = serviceScope.ServiceProvider.GetService<RoleManager<ApplicationRole>>();
            _userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
            _context = context;
            CreateRoles(); // Add roles
            CreateUsers(); // Add users
            AddContent();
        }

        private void CreateRoles()
        {
            var rolesToAdd = new List<ApplicationRole>(){
                new ApplicationRole { Name= "Admin", Description = "Full rights role"},
                new ApplicationRole { Name= "User", Description = "Limited rights role"}
            };
            foreach (var role in rolesToAdd)
            {
                if (!_roleManager.RoleExistsAsync(role.Name).Result)
                {
                    _roleManager.CreateAsync(role).Result.ToString();
                }
            }
        }
        private void CreateUsers()
        {
            if (!_context.ApplicationUsers.Any())
            {

                _userManager.CreateAsync(new ApplicationUser { UserName = "admin@admin.com", FirstName = "Admin first", LastName = "Admin last", Email = "admin@admin.com", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true }, "P@ssw0rd!").Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("admin@admin.com").GetAwaiter().GetResult(), "Admin").Result.ToString();

                _userManager.CreateAsync(new ApplicationUser { UserName = "user@user.com", FirstName = "First", LastName = "Last", Email = "user@user.com", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true }, "P@ssw0rd!").Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("user@user.com").GetAwaiter().GetResult(), "User").Result.ToString();
            }
        }
        private void AddContent()
        {

            if (!_context.Clients.Any())
            {
                _context.Clients.Add(new Client
                {
                    Name = "Horbatenko",
                    PhysicAddress = "dsds",
                    ShippingAddress = "dsds",
                    Phone = "322-233-322",
                    Info = "info",
                    Status = 0,
                    ContactPerson = "Vasyl"
                });
                _context.SaveChanges();
            }

            if (!_context.ClientLinks.Any())
            {
                _context.ClientLinks.Add(new ClientLink { ClientId = 1, Link = "google.com" });
                _context.SaveChanges();
                _context.ClientLinks.Add(new ClientLink { ClientId = 1, Link = "ukr.net" });
                _context.SaveChanges();
            }

            if (!_context.Products.Any())
            {
                _context.Products.Add(new Product { Name = "Product1", Volume = 50, NicotineAmount = 0.24 });
                _context.SaveChanges();
                _context.Products.Add(new Product { Name = "Product2", Volume = 45, NicotineAmount = 1.43 });
                _context.SaveChanges();
            }

            if (!_context.Orders.Any())
            {
                _context.Orders.Add(new Order { Date = DateTime.Now, Realization = true, Payment = false, ClientId = 1 });
                _context.SaveChanges();
            }

            if (!_context.OrderDetails.Any())
            {
                _context.OrderDetails.Add(new OrderDetails { OrderId = 2, Count = 2, Price = 30.45M, ProductId = 2 });
                _context.SaveChanges();
                _context.OrderDetails.Add(new OrderDetails { OrderId = 2, Count = 4, Price = 30.46M, ProductId = 3 });
                _context.SaveChanges();
            }

            if (!_context.Flavours.Any())
            {
                _context.Flavours.Add(new Flavour { Title = "Flavour1", Manufacturer = "Manufacturer1" });
                _context.SaveChanges();
                _context.Flavours.Add(new Flavour { Title = "Flavour2", Manufacturer = "Manufacturer1" });
                _context.SaveChanges();
            }

            if (!_context.Receipts.Any())
            {
                _context.Receipts.Add(new Receipt {NicotinePercent = 20, PgPercent = 30, VgPercent = 50 });
                _context.SaveChanges();
            }

            if (!_context.ReceiptFlavours.Any())
            {
                _context.ReceiptFlavours.Add(new ReceiptFlavours { ReceiptId = 1, FlavourId = 1, Percent = 0.5 });
                _context.SaveChanges();
                _context.ReceiptFlavours.Add(new ReceiptFlavours { ReceiptId = 1, FlavourId = 2, Percent = 1.5 });
                _context.SaveChanges();
            }

            if (!_context.Content.Any())
            {
                _context.Content.Add(new Content { Key = "TITLE" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_HOME" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_EXAMPLES" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_LOGIN" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_LOGOUT" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_REGISTER" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_ADMIN" });
                _context.SaveChanges();
            }

            if (!_context.ContentText.Any())
            {
                _context.ContentText.Add(new ContentText { Text = "Site title", ContentId = 1 });
                _context.ContentText.Add(new ContentText { Text = "Home", ContentId = 2 });
                _context.ContentText.Add(new ContentText { Text = "Examples", ContentId = 3 });
                _context.ContentText.Add(new ContentText { Text = "Login", ContentId = 4 });
                _context.ContentText.Add(new ContentText { Text = "Logout", ContentId = 5 });
                _context.ContentText.Add(new ContentText { Text = "Register", ContentId = 6 });
                _context.ContentText.Add(new ContentText { Text = "Admin", ContentId = 7 });
                _context.SaveChanges();
            }
        }
    }
}
