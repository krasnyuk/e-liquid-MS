using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public enum StatusEnum
    {
        active, inactive
    }
        


    public class Client : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(150)]
        public string PhysicAddress { get; set; }
        [Required]
        [StringLength(150)]
        public string ShippingAddress { get; set; }
        [Required]
        [StringLength(100)]
        public string ContactPerson { get; set; }
        [Required]
        [StringLength(15)]
        public string Phone { get; set; }
        [StringLength(15)]
        public string SecondaryPhone { get; set; }
        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        public StatusEnum Status { get; set; }
        [StringLength(255)]
        public string Info { get; set; }

        public virtual ICollection<ClientLink> ClientLinks { get; set; }
        public virtual ICollection<Shipping> Shipping { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }

}