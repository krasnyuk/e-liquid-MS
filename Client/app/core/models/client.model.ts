export interface ClientLinkModel {
    id: number;
    link: string;
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