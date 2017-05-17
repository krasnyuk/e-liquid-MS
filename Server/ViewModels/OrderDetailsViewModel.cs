namespace AspNetCoreSpa.Server.ViewModels
{
    public class OrderDetailsViewModel
    {
        // OrderDetails
        public int Id { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }

        // Product
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Volume { get; set; }
        public double NicotineAmount { get; set; }
        public string Info { get; set; }
    }
}
