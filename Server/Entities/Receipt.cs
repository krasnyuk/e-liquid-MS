using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Receipt : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        public double PgPercent { get; set; }
        [Required]
        public double VgPercent { get; set; }
        [Required]
        public double NicotinePercent { get; set; }

        public virtual ICollection<ReceiptFlavours> ReceiptFlavours { get; set; }
    }
}