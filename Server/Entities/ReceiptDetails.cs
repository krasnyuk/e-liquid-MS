using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class ReceiptDetails : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Amount { get; set; }

        [Required]
        public int ReceiptId { get; set; }
        [Required]
        public int ComponentId { get; set; }
    }
}