import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";

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
                component: DashboardComponent
            }
        ]
    }
];

export const pagesRouting = RouterModule.forChild(pagesRoutes);
