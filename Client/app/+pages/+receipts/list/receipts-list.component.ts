import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {ReceiptModel} from "../../../core/models/receipt.model";
import {ReceiptsService} from "../../../core/services/receipts.service";

@Component({
    selector: 'appc-receipt-list',
    templateUrl: 'receipts-list.component.html'
})
export class ReceiptsListComponent extends BaseComponent {

    public receipts: Array<ReceiptModel> = [];

    constructor(private receiptsService: ReceiptsService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.receiptsService.getReceipts().subscribe((success: Array<any>) => {
            this.receipts = success.sort(this.dynamicSort('id', -1));
        });
    }

    public deleteReceipt(receiptModel: ReceiptModel): void {
        if (confirm('Удалить данный рецепт?')) {
            this.receiptsService.deleteReceipt(receiptModel.id).subscribe(success => {
                this.removeFromObjArray(this.receipts, receiptModel.id);
                this.notificationService.success(`Рецепт ${receiptModel.title} успешно удалён!`);
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
