import {RouterModule, Routes} from "@angular/router";
import {FlavoursPageComponent} from "./flavours-page.component";
import {FlavoursListComponent} from "./list/flavours-list.component";
import {FlavoursEditComponent} from "./edit/flavour-edit.component";


export const routes: Routes = [
    {
        path: '',
        component: FlavoursPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: FlavoursListComponent
            },
            {
                path: 'edit/:flavourId',
                component: FlavoursEditComponent
            },
            {
                path: 'add',
                component: FlavoursEditComponent
            }
        ]
    }
];

export const flavoursRouting = RouterModule.forChild(routes);
