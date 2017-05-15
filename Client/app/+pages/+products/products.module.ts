import {NgModule} from '@angular/core';
import {productsRouting} from "./products.routing";
import {SharedModule} from "../../shared/shared.module";
import {ProductsPageComponent} from "./products-page.component";
import {ProductListComponent} from "./list/product-list.component";

@NgModule({
    imports: [
        SharedModule,
        productsRouting
    ],
    exports: [],
    declarations: [
        ProductsPageComponent,
        ProductListComponent
    ],
    providers: [],
})
export class ProductsModule {
}
