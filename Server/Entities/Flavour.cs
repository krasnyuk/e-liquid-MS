using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Flavour : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [Required]
        [StringLength(50)]
        public string Manufacturer { get; set; }

        public virtual ICollection<ReceiptFlavours> ReceiptFlavours { get; set; }
    }
}