namespace AspNetCoreSpa.Server.ViewModels
{
    public class MainPageInfoViewModel
    {
        public int ClientCount { get; set; }
        public double AverageOrder { get; set; }
        public int TotalSold { get; set; }
        public decimal TotalProfit { get; set; }
        public int ThisMonth { get; set; }
    }
}