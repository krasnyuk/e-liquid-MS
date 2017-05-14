import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import {CanActivateUser} from "../shared/guards/user-can-activate.guard";

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                canActivate: [CanActivateUser],
                component: DashboardComponent
            }
        ]
    }
];

export const pagesRouting = RouterModule.forChild(pagesRoutes);
