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
            }
        ]
    }
];

export const pagesRouting = RouterModule.forChild(pagesRoutes);
