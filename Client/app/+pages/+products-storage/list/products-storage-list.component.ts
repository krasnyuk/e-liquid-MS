import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {ProductsStorageModel} from "../../../core/models/storage.model";
import {ProductsStorageService} from "../../../core/services/products-storage.service";

@Component({
    selector: 'appc-products-storage-list',
    templateUrl: 'products-storage-list.component.html'
})
export class ProductsStorageListComponent extends BaseComponent {

    public productsStorages: Array<ProductsStorageModel> = [];

    constructor(private productsStorageService: ProductsStorageService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.productsStorageService.getStorageItems().subscribe((success: Array<any>) => {
            this.productsStorages = success.sort(this.dynamicSort('id', -1));
        });
    }

    public deleteStorageItem(productsStorageModel: ProductsStorageModel): void {
        if (confirm(`Удалить состояние склада # ${productsStorageModel.id}?`)) {
            this.productsStorageService.deleteStorageItem(productsStorageModel.id).subscribe(success => {
                this.removeFromObjArray(this.productsStorages, productsStorageModel.id);
                this.notificationService.success(`Состояние склада на ${this.formatDate(productsStorageModel.date)}  успешно удалено!`);
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
