using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class OrderDetails : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Count { get; set; }
        [Required]
        public decimal Price { get; set; }

        [Required]
        public int OrderId { get; set; }
        [Required]
        public int ProductId { get; set; }
    }
}