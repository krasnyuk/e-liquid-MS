import {Routes, RouterModule} from '@angular/router';
import {ClientsPageComponent} from "./clients-page.component";
import {ClientsListComponent} from "./list/clients-list.component";
import {ClientEditComponent} from "./edit/client-edit.component";


export const routes: Routes = [
    {
        path: '',
        component: ClientsPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ClientsListComponent
            },
            {
                path: 'edit/:clientId',
                component: ClientEditComponent
            },
            {
                path: 'add',
                component: ClientEditComponent
            }
        ]
    }
];

export const clientsRouting = RouterModule.forChild(routes);
