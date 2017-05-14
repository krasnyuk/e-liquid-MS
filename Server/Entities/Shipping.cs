using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Shipping : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }
        [Required]  
        public bool Status { get; set; }

        [Required]
        public int OrderId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}