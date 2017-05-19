using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class StorageDetails : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Count { get; set; }

        public int ProductId { get; set; }
        public int StorageId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Storage Storage { get; set; }
    }
}
