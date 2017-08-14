import {ClientModel} from "./client.model";
export interface OrderDetailsModel {
    count: number;
    price: number;
    productId: number
}

export interface OrderModel {
    id: number;
    date: string;
    info: string;
    realization: boolean;
    payment: boolean;
    clientId: number;
    orderDetails: Array<OrderDetailsModel>;
    // additional properties
    client: ClientModel;
}

export interface OrderReportModel {
    id: number;
    clientName: string;
    totalAmount: number;
    pricePerUnit: number;
    date: string;
    totalSum: number;
}
