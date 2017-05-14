using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public int Volume { get; set; } //мл
        [Required]
        public int NicotineAmount { get; set; }
        [StringLength(255)]
        public string Info { get; set; }

        public ICollection<Shipping> Shipping { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
        public ICollection<Storage> Storage { get; set; }
    }
}