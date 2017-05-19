import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import {CanActivateUser} from "../shared/guards/user-can-activate.guard";

const pagesRoutes: Routes = [
    {
        path: '',
        canActivate: [CanActivateUser],
        component: PagesComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'profile',
                loadChildren: './+profile/profile.module#ProfileModule'
            },
            {
                path: 'products',
                loadChildren: './+products/products.module#ProductsModule'
            },
            {
                path: 'clients',
                loadChildren: './+clients/clients.module#ClientsModule'
            },
            {
                path: 'orders',
                loadChildren: './+orders/orders.module#OrdersModule'
            },
            {
                path: 'flavours',
                loadChildren: './+flavours/flavours.module#FlavoursModule'
            },
            {
                path: 'receipts',
                loadChildren: './+receipts/receipts.module#ReceiptsModule'
            }
        ]
    }
];

export const pagesRouting = RouterModule.forChild(pagesRoutes);
