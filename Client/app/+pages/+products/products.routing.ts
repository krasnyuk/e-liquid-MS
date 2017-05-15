import {Routes, RouterModule} from '@angular/router';
import {ProductsPageComponent} from "./products-page.component";
import {ProductListComponent} from "./list/product-list.component";
import {ProductsEditComponent} from "./edit/products-edit.component";


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
            },
            {
                path: 'edit/:productId',
                component: ProductsEditComponent
            },
            {
                path: 'add',
                component: ProductsEditComponent
            }
        ]
    }
];

export const productsRouting = RouterModule.forChild(routes);
