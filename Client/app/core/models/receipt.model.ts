import {FlavourModel} from "./flavour.model";
export interface ReceiptFlavoursModel {
    id: number;
    percent: number;
    flavourId: number;
    receiptId: number;
    flavour: FlavourModel;
}

export interface ReceiptModel {
    id: number;
    title: string;
    pgPercent: number;
    vgPercent: number;
    nicotinePercent: number;
    receiptFlavours: Array<ReceiptFlavoursModel>;
}