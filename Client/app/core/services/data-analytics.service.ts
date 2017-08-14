import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DataService} from "./data.service";

@Injectable()
export class DataAnalyticsService {

    constructor(private dataService: DataService) {
    }

    public getDashboardInfo(): Observable<any> {
        return this.dataService.get('api/mainPageInfo');
    }

    public getOrdersChartData(): Observable<any> {
        return this.dataService.get('api/Charts/Order')
    }

    public getProductsPercentsChartData(): Observable<any> {
        return this.dataService.get('api/Charts/Product')
    }

    public getOrdersByDate(firstDate: any, secondDate: any): Observable<any> {
        const url = `api/Order/api/GetOrdersByDate?firstDate=${firstDate}&secondDate=${secondDate}`;
        return this.dataService.get(url);
    }

}
