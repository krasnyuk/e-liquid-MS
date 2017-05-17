using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class ReceiptFlavours
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double Percent { get; set; }

        public int FlavourId { get; set; }
        public int ReceiptId { get; set; }

        public virtual Receipt Receipt { get; set; }
        public virtual Flavour Flavour { get; set; }
    }
}
