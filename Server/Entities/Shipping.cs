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
        public int Status { get; set; }

        public int OrderId { get; set; }
        public int UserId { get; set; }

        public virtual Order Order { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}