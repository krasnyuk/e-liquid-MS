export interface ClientLinkModel {
    id: number;
    link: string;
    clientId: number;
}

export interface ClientModel {
    id: number;
    name: string;
    physicAddress: string;
    shippingAddress: string;
    contactPerson: string;
    phone: string;
    secondaryPhone: string;
    status: string;
    info: string;
    clientLinks: Array<ClientLinkModel>;
}

// [Key]
// public int Id { get; set; }
// [Required]
//     [StringLength(100)]
// public string Name { get; set; }
// [Required]
//     [StringLength(150)]
// public string PhysicAddress { get; set; }
// [Required]
//     [StringLength(150)]
// public string ShippingAddress { get; set; }
// [Required]
//     [StringLength(100)]
// public string ContactPerson { get; set; }
// [Required]
//     [StringLength(15)]
// public string Phone { get; set; }
// [StringLength(15)]
// public string SecondaryPhone { get; set; }
// [Required]
//     [JsonConverter(typeof(StringEnumConverter))]
// public StatusEnum Status { get; set; }
// [StringLength(255)]
// public string Info { get; set; }