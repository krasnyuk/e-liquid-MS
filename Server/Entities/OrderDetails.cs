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

        public int OrderId { get; set; }
        public int ProductId { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}