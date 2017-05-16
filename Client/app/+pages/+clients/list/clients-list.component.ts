import {Component} from "@angular/core";
import {ProductModel} from "../../../core/models/product.model";
import {ProductsService} from "../../../core/services/products.service";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'appc-clients-list',
    templateUrl: 'clients-list.component.html'
})
export class ClientsListComponent extends BaseComponent  {

    public products: Array<ProductModel> = [];

    constructor(private productsService: ProductsService,
                private notificationService: ToastsManager) {
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
                this.notificationService.success('Продукт успешно удалён!');
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
