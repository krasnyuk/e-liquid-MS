using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspNetCoreSpa.Server.Entities
{
    public class ClientLink : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Link { get; set; }
        public int ClientId { get; set; }

        public virtual Client Client { get; set; }
    }
}