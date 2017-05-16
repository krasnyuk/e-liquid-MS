import {NgModule} from '@angular/core';
import {clientsRouting} from "./clients.routing";
import {SharedModule} from "../../shared/shared.module";
import {ClientsPageComponent} from "./clients-page.component";
import {ClientsListComponent} from "./list/clients-list.component";
import {ClientEditComponent} from "./edit/client-edit.component";
import {ClientDetailsComponent} from "./details/client-details.component";

@NgModule({
    imports: [
        SharedModule,
        clientsRouting
    ],
    exports: [],
    declarations: [
        ClientsPageComponent,
        ClientsListComponent,
        ClientEditComponent,
        ClientDetailsComponent
    ],
    providers: [],
})
export class ClientsModule {
}
