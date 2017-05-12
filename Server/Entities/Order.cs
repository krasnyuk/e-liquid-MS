using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Order : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(255)]
        public string Info { get; set; }
        [Required]
        public bool Realization { get; set; }
        [Required]
        public bool Payment { get; set; }

        [Required]
        public int ClientId { get; set; }

        public ICollection<OrderDetails> OrderDetails { get; set; }
        public ICollection<Shipping> Shipping { get; set; }
    }
}

