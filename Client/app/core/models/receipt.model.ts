export interface ReceiptFlavoursModel {
    id: number;
    percent: number;
    flavourId: number;
    receiptId: number;
}

export interface ReceiptModel {
    id: number;
    title: number;
    pgPercent: number;
    vgPercent: number;
    nicotinePercent: number;
    receiptFlavours: Array<ReceiptFlavoursModel>;
}