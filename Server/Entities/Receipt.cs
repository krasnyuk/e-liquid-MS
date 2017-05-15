using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Receipt : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Description { get; set; }

        public virtual ICollection<ReceiptDetails> ReceiptDetails { get; set; }
    }
}