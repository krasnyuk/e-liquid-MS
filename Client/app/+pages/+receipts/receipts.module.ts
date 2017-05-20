import {NgModule} from "@angular/core";
import {receiptsRouting} from "./receipt.routing";
import {SharedModule} from "../../shared/shared.module";
import {ReceiptsPageComponent} from "./receipts-page.component";
import {ReceiptsListComponent} from "./list/receipts-list.component";
import {ReceiptEditComponent} from "./edit/receipt-edit.component";
import {CalculatorComponent} from "./calculator/calculator.component";

@NgModule({
    imports: [
        SharedModule,
        receiptsRouting
    ],
    declarations: [
        ReceiptsPageComponent,
        ReceiptsListComponent,
        ReceiptEditComponent,
        CalculatorComponent
    ]
})
export class ReceiptsModule {
}
