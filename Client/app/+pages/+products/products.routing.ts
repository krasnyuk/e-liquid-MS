import {Routes, RouterModule} from '@angular/router';
import {ProductsPageComponent} from "./products-page.component";
import {ProductListComponent} from "./list/product-list.component";


export const routes: Routes = [
    {
        path: '',
        component: ProductsPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ProductListComponent
            }
        ]
    }
];

export const productsRouting = RouterModule.forChild(routes);
