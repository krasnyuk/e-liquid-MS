import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ReceiptsService} from "../../../core/services/receipts.service";
import {ReceiptModel} from "../../../core/models/receipt.model";

@Component({
    selector: 'appc-calculator',
    templateUrl: 'calculator.component.html'
})
export class CalculatorComponent extends BaseEditForm {

    public receiptsAvailable: Array<ReceiptModel> = [];
    public totalLiquidAmount: number = 0;
    public currentReceipt: ReceiptModel = <ReceiptModel>{
        id: 0,
        title: "",
        pgPercent: 0,
        vgPercent: 0,
        nicotinePercent: 0,
        receiptFlavours: []
    };

    constructor(private receiptsService: ReceiptsService) {
        super();
    }

    ngOnInit() {
        this.receiptsService.getReceipts().subscribe(success => {
            this.receiptsAvailable = success;
        });
    }

    public getPgTotalVolume() {
        return  this.getCurrentReceiptPgVolume() - this.getCurrentReceiptNicotineVolume() - this.getCurrentReceiptFlavoursVolume();
    }

    public getCurrentReceiptPgVolume = (): number => ((this.totalLiquidAmount / 100) * this.currentReceipt.pgPercent);

    public getCurrentReceiptVgVolume = (): number => ((this.totalLiquidAmount / 100) * this.currentReceipt.vgPercent);

    public getCurrentReceiptNicotineVolume = (): number => ((this.totalLiquidAmount / 100) * this.currentReceipt.nicotinePercent);

    private getCurrentReceiptFlavoursVolume(): number {
        let sum = 0;
        this.currentReceipt.receiptFlavours.forEach(item => {
            sum += (this.totalLiquidAmount / 100) * item.percent;
        });

        return sum;
    }
}