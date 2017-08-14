import {RouterModule, Routes} from "@angular/router";
import {ReportsPageComponent} from "./reports-page.component";
import {OrdersReportComponent} from "./orders-report/orders-report.component";


export const routes: Routes = [
    {
        path: '',
        component: ReportsPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'orders'
            },
            {
                path: 'orders',
                component: OrdersReportComponent
            }
        ]
    }
];

export const reportsRouting = RouterModule.forChild(routes);
