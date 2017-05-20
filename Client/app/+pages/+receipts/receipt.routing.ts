import {RouterModule, Routes} from "@angular/router";
import {ReceiptsPageComponent} from "./receipts-page.component";
import {ReceiptsListComponent} from "./list/receipts-list.component";
import {ReceiptEditComponent} from "./edit/receipt-edit.component";
import {CalculatorComponent} from "./calculator/calculator.component";


export const routes: Routes = [
    {
        path: '',
        component: ReceiptsPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ReceiptsListComponent
            },
            {
                path: 'edit/:receiptId',
                component: ReceiptEditComponent
            },
            {
                path: 'add',
                component: ReceiptEditComponent
            },
            {
                path: 'calc',
                component: CalculatorComponent
            }
        ]
    }
];

export const receiptsRouting = RouterModule.forChild(routes);
