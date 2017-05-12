using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Storage : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }
        [Required]
        public int Count { get; set; }

        [Required]
        public int ProductId { get; set; }
    }
}

