import {NgModule} from '@angular/core';
import {ordersRouting} from "./orders.routing";
import {SharedModule} from "../../shared/shared.module";
import {OrdersPageComponent} from "./orders-page.component";
import {OrdersListComponent} from "./list/orders-list.component";
import {ClientEditComponent} from "./edit/client-edit.component";
import {ClientDetailsComponent} from "./details/client-details.component";

@NgModule({
    imports: [
        SharedModule,
        ordersRouting
    ],
    exports: [],
    declarations: [
        OrdersPageComponent,
        OrdersListComponent,
        ClientEditComponent,
        ClientDetailsComponent
    ],
    providers: [],
})
export class OrdersModule {
}
