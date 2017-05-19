import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {ReceiptModel} from "../models/receipt.model";

@Injectable()
export class ReceiptsService {
    private baseUrl = 'api/receipt';

    constructor(private dataService: DataService) {
    }

    public getReceipts(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getReceipt(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteReceipt(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveReceipt(receiptModel: ReceiptModel): Observable<any> {
        if (!receiptModel.id) {
            receiptModel.id = 0;
            return this.createReceipt(receiptModel);
        }
        return this.updateReceipt(receiptModel);
    }

    private createReceipt(receiptModel: ReceiptModel): Observable<any> {
        return this.dataService.post(this.baseUrl, receiptModel);
    }

    private updateReceipt(receiptModel: ReceiptModel): Observable<any> {
        const url = `${this.baseUrl}/${receiptModel.id}`;
        return this.dataService.put(url, receiptModel);
    }

}
