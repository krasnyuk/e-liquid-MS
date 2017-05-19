import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";
import {ReceiptModel} from "../../../core/models/receipt.model";
import {FlavourModel} from "../../../core/models/flavour.model";
import {ReceiptsService} from "../../../core/services/receipts.service";
import {FlavoursService} from "../../../core/services/flavours.service";
import {ValidationService} from "../../../shared/forms/validation.service";

@Component({
    selector: 'appc-receipt-edit',
    templateUrl: 'receipt-edit.component.html'
})
export class ReceiptEditComponent extends BaseEditForm {

    public receipt: ReceiptModel = <ReceiptModel> {};
    public flavoursAvailable: Array<FlavourModel>;

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private receiptsService: ReceiptsService,
                private flavoursService: FlavoursService) {
        super();
    }

    ngOnInit() {
        this.flavoursService.getFlavours().subscribe(success => {
            this.flavoursAvailable = success;
        }, error => {
            this.notificationService.error(error);
        });
        this.formTitle = "Новый рецепт";
        this.isEditingMode = false;
        this.editForm = this.fb.group({
            id: [""],
            title: ["", [Validators.required, Validators.maxLength(100)]],
            pgPercent: ["", [Validators.required, ValidationService.percentValidator]],
            vgPercent: ["", [Validators.required, ValidationService.percentValidator]],
            nicotinePercent: ["", [Validators.required, ValidationService.percentValidator]],
            receiptFlavours: this.fb.array([])
        });
        this.router.params.subscribe(params => {
            const receiptId = +params['receiptId'];
            if (receiptId) {
                this.isEditingMode = true;
                this.formTitle = "Редактировать рецепт";
                this.receiptsService.getReceipt(receiptId).subscribe(success => {
                    this.receipt = success;
                    this.updateEditForm();
                });
            } else {
                this.addDynamicFormControl();
            }
        });
    }

    protected saveInternal() {
        this.receipt = this.editForm.value as ReceiptModel;
        this.receiptsService.saveReceipt(this.receipt).subscribe(success => {
            if (!this.isEditingMode) {
                this.receipt = success;
            }
            this.isProcessing = false;
            this.notificationService.success(`Рецепт сохранён!`);
            this.utilsService.navigate('/pages/receipts');
        }, error => {
            this.isProcessing = false;
            this.notificationService.error(`Невозможно сохранить рецепт! ` + error);
        });
    }

    private updateEditForm() {
        if (this.receipt.receiptFlavours.length !== 0) {
            this.receipt.receiptFlavours.forEach(item => this.addDynamicFormControl()); // add new control for each link
        }
        this.editForm.patchValue(this.receipt); // update form value
    }

    private getOtherLinkFormControl = (): FormGroup => this.fb.group({
        percent: ["", [Validators.required, ValidationService.percentValidator]],
        flavourId: ["", Validators.required]
    });

    public addDynamicFormControl(): void {
        (<FormArray>this.editForm.controls['receiptFlavours']).push(this.getOtherLinkFormControl());
    }

    public deleteDynamicControl(controlId: number): void {
        (<FormArray>this.editForm.controls['receiptFlavours']).removeAt(controlId);
    }


}
