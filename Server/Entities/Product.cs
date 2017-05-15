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
        public double NicotineAmount { get; set; }
        [StringLength(255)]
        public string Info { get; set; }

        public virtual ICollection<Shipping> Shipping { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
        public virtual ICollection<Storage> Storage { get; set; }
    }
}