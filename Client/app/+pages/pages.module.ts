import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {pagesRouting} from "./pages.routing";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
    imports: [SharedModule, pagesRouting],
    declarations: [
        DashboardComponent
    ],
})
export class PagesModule {
}
