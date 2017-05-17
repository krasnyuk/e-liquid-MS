import {Routes, RouterModule} from '@angular/router';
import {OrdersPageComponent} from "./orders-page.component";
import {OrdersListComponent} from "./list/orders-list.component";
import {ClientEditComponent} from "./edit/client-edit.component";
import {ClientDetailsComponent} from "./details/client-details.component";


export const routes: Routes = [
    {
        path: '',
        component: OrdersPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: OrdersListComponent
            },
            {
                path: 'edit/:orderId',
                component: ClientEditComponent
            },
            {
                path: 'add',
                component: ClientEditComponent
            },
            {
                path: 'details/:orderId',
                component: ClientDetailsComponent
            }
        ]
    }
];

export const ordersRouting = RouterModule.forChild(routes);
