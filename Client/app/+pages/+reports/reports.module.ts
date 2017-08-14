import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {reportsRouting} from "./reports.routing";
import {ReportsPageComponent} from "./reports-page.component";
import {OrdersReportComponent} from "./orders-report/orders-report.component";


@NgModule({
    imports: [
        SharedModule,
        reportsRouting
    ],
    exports: [],
    declarations: [
        ReportsPageComponent,
        OrdersReportComponent
    ],
    providers: [],
})
export class ReportsModule {
}
