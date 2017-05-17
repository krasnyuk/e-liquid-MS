import {ClientModel} from "./client.model";
export interface OrderDetailsModel {
    id: number;
    count: number;
    price: number;
    orderId: number;
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
