import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {OrderModel} from "../models/order.model";

@Injectable()
export class OrdersService {
    private baseUrl = 'api/order';

    constructor(private dataService: DataService) {
    }

    public getOrders(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getOrder(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteOrder(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveOrder(orderModel: OrderModel): Observable<any> {
        if (!orderModel.id) {
            orderModel.id = 0;
            return this.createOrder(orderModel);
        }
        return this.updateOrder(orderModel);
    }

    private createOrder(orderModel: OrderModel): Observable<any> {
        return this.dataService.post(this.baseUrl, orderModel);
    }

    private updateOrder(orderModel: OrderModel): Observable<any> {
        const url = `${this.baseUrl}/${orderModel.id}`;
        return this.dataService.put(url, orderModel);
    }

}
