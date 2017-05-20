import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../../core/base/base-component";
import {ProductsStorageModel} from "../../../core/models/storage.model";
import {ProductsStorageService} from "../../../core/services/products-storage.service";

@Component({
    selector: 'appc-product-storage-order',
    templateUrl: 'product-storage-details.component.html',
})
export class ProductStorageDetailsComponent extends BaseComponent {

    public storage: ProductsStorageModel = <ProductsStorageModel> {};

    constructor(private productsStorageService: ProductsStorageService,
                private router: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.router.params.subscribe(params => {
            const storageId = +params['storageId'];
            if (storageId) {
                this.productsStorageService.getStorageItem(storageId).subscribe(success => {
                    this.storage = success;
                }, error => {});
            }
        });
    }
}
