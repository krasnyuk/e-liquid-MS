import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {ProductModel} from "../models/product.model";

@Injectable()
export class ProductsService {
    private baseUrl = 'api/product';

    constructor(private dataService: DataService) {
    }

    public getProducts(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getProduct(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteProduct(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveProduct(product: ProductModel): Observable<any> {
        if (!product.id) {
            return this.createProduct(product);
        }
        return this.updateProduct(product);
    }

    private createProduct(product: ProductModel): Observable<any> {
        return this.dataService.post(this.baseUrl, product);
    }

    private updateProduct(product: ProductModel): Observable<any> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.dataService.put(url, product);
    }

}