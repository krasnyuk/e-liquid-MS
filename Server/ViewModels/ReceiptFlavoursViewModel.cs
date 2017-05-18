namespace AspNetCoreSpa.Server.ViewModels
{
    public class ReceiptFlavoursViewModel
    {
        //ReceiptFlavours
        public int Id { get; set; }
        public double Percent { get; set; }

        //Flavour
        public int FlavourId { get; set; }
        public string Title { get; set; }
        public string Manufacturer { get; set; }
    }
}