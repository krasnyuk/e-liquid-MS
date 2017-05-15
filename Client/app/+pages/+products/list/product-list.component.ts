import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../core/models/product.model";
import {ProductsService} from "../../../core/services/products.service";

@Component({
    selector: 'appc-product-list',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit {

    public products: Array<ProductModel> = [];

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.productsService.getProducts().subscribe(success => {
            this.products = success;
        });
    }
}