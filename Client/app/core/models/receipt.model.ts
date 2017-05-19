export interface ReceiptFlavoursModel {
    id: number;
    percent: number;
    flavourId: number;
    receiptId: number;
//     public int Id { get; set; }
// [Required]
// public double Percent { get; set; }
//
// public int FlavourId { get; set; }
// public int ReceiptId { get; set; }
}

export interface ReceiptModel {
    id: number;
    pgPercent: number;
    vgPercent: number;
    nicotinePercent: number;
    receiptFlavours: Array<ReceiptFlavoursModel>;
//     public int Id { get; set; }
// [Required]
// public double PgPercent { get; set; }
// [Required]
// public double VgPercent { get; set; }
// [Required]
// public double NicotinePercent { get; set; }
}