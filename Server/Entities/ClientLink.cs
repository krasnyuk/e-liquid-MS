using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class ClientLink : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Link { get; set; }

        [Required]
        public int ClientId { get; set; }
    }

}