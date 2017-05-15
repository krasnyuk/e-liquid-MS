import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {pagesRouting} from "./pages.routing";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";

@NgModule({
    imports: [SharedModule, pagesRouting],
    declarations: [
        PagesComponent,
        DashboardComponent
    ],
})
export class PagesModule {
}
