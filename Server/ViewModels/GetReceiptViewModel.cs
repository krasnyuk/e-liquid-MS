using System.Collections.Generic;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class GetReceiptViewModel
    {
        public int Id { get; set; }
        public double PgPercent { get; set; }
        public double VgPercent { get; set; }
        public double NicotinePercent { get; set; }

        public List<ReceiptFlavoursViewModel> ReceiptFlavours { get; set; }
    }
}
