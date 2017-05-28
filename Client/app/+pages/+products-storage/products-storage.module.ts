import {NgModule} from "@angular/core";
import {productsStorageRouting} from "./products-storage.routing";
import {SharedModule} from "../../shared/shared.module";
import {ProductsStoragePageComponent} from "./products-storage-page.component";
import {ProductsStorageListComponent} from "./list/products-storage-list.component";
import {ProductsStorageEditComponent} from "./edit/products-storage-edit.component";
import {ProductStorageDetailsComponent} from "./details/product-storage-details.component";
import {RemainComponent} from "./remain/remain.component";

@NgModule({
    imports: [
        SharedModule,
        productsStorageRouting
    ],
    exports: [],
    declarations: [
        ProductsStoragePageComponent,
        ProductsStorageListComponent,
        ProductsStorageEditComponent,
        ProductStorageDetailsComponent,
        RemainComponent
    ],
    providers: [],
})
export class ProductsStorageModule {
}
