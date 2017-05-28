import {RouterModule, Routes} from "@angular/router";
import {ProductsStoragePageComponent} from "./products-storage-page.component";
import {ProductsStorageListComponent} from "./list/products-storage-list.component";
import {ProductsStorageEditComponent} from "./edit/products-storage-edit.component";
import {ProductStorageDetailsComponent} from "./details/product-storage-details.component";
import {RemainComponent} from "./remain/remain.component";


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
            },
            {
                path: 'remain',
                component: RemainComponent
            }
        ]
    }
];

export const productsStorageRouting = RouterModule.forChild(routes);
