import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../core/models/product.model";
import {ProductsService} from "../../../core/services/products.service";
import {BaseComponent} from "../../../core/base/base-component";

@Component({
    selector: 'appc-product-list',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent extends BaseComponent  {

    public products: Array<ProductModel> = [];

    constructor(private productsService: ProductsService) {
        super();
    }

    ngOnInit() {
        this.productsService.getProducts().subscribe(success => {
            this.products = success;
        });
    }

    public deleteProduct(productId: number): void {
        if (confirm('Удалить данный продукт?')) {
            this.productsService.deleteProduct(productId).subscribe(success => {
                this.removeFromObjArray(this.products, productId);
            }, error => {
            });
        }
    }
}
