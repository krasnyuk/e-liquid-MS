import {Routes, RouterModule} from '@angular/router';
import {OrdersPageComponent} from "./orders-page.component";
import {OrdersListComponent} from "./list/orders-list.component";
import {OrderEditComponent} from "./edit/order-edit.component";
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
                component: OrderEditComponent
            },
            {
                path: 'add',
                component: OrderEditComponent
            },
            {
                path: 'details/:orderId',
                component: ClientDetailsComponent
            }
        ]
    }
];

export const ordersRouting = RouterModule.forChild(routes);
