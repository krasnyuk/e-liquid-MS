import {RouterModule, Routes} from "@angular/router";
import {ProductsStoragePageComponent} from "./products-storage-page.component";
import {ProductsStorageListComponent} from "./list/products-storage-list.component";
import {ProductsStorageEditComponent} from "./edit/products-storage-edit.component";
import {ProductStorageDetailsComponent} from "./details/product-storage-details.component";


export const routes: Routes = [
    {
        path: '',
        component: ProductsStoragePageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ProductsStorageListComponent
            },
            {
                path: 'edit/:storageId',
                component: ProductsStorageEditComponent
            },
            {
                path: 'add',
                component: ProductsStorageEditComponent
            },
            {
                path: 'details/:storageId',
                component: ProductStorageDetailsComponent
            }
        ]
    }
];

export const productsStorageRouting = RouterModule.forChild(routes);
