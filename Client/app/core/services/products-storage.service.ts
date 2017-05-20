import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {UtilityService} from "./utility.service";
import {StorageModel} from "../models/storage.model";

@Injectable()
export class ProductsStorageService {
    private baseUrl = 'api/storage';

    constructor(private dataService: DataService,
                private utilsService: UtilityService) {
    }

    public getStorageItems(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getStorageItem(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteStorageItem(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveStorageItem(storageModel: StorageModel): Observable<any> {
        if (!storageModel.id) {
            storageModel.id = 0;
            return this.createStorageItem(storageModel);
        }
        return this.updateStorageItem(storageModel);
    }

    private createStorageItem(storageModel: StorageModel): Observable<any> {
        storageModel.date = this.utilsService.convertDateTime(new Date());
        return this.dataService.post(this.baseUrl, storageModel);
    }

    private updateStorageItem(storageModel: StorageModel): Observable<any> {
        const url = `${this.baseUrl}/${storageModel.id}`;
        return this.dataService.put(url, storageModel);
    }

}
