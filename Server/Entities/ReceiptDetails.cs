using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class ReceiptDetails : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double Amount { get; set; }

        public int ReceiptId { get; set; }
        public int ComponentId { get; set; }

        public virtual Receipt Receipt { get; set; }
        public virtual Component Component { get; set; }
    }
}