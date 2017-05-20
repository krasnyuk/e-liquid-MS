import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";
import {ProductModel} from "../../../core/models/product.model";
import {ProductsService} from "../../../core/services/products.service";
import {ProductsStorageModel} from "../../../core/models/storage.model";
import {ProductsStorageService} from "../../../core/services/products-storage.service";

@Component({
    selector: 'appc-products-storage-edit',
    templateUrl: 'products-storage-edit.component.html'
})
export class ProductsStorageEditComponent extends BaseEditForm {

    public storage: ProductsStorageModel = <ProductsStorageModel> {};
    public productsAvailable: Array<ProductModel> = [];

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private productsService: ProductsService,
                private productsStorageService: ProductsStorageService) {
        super();
    }

    ngOnInit() {
        this.productsService.getProducts().subscribe(success => {
            this.productsAvailable = success;
        }, error => {
            this.notificationService.error(error);
        });
        this.formTitle = "Новое состояние склада";
        this.isEditingMode = false;
        this.editForm = this.fb.group({
            id: [""],
            date: ["", Validators.required],
            storageDetails: this.fb.array([])
        });
        this.router.params.subscribe(params => {
            const storageId = +params['storageId'];
            if (storageId) {
                this.isEditingMode = true;
                this.formTitle = "Редактировать состояние склада";
                this.productsStorageService.getStorageItem(storageId).subscribe(success => {
                    this.storage = success;
                    this.updateEditForm();
                });
            } else {
                this.addDynamicFormControl();
            }
        });
    }

    protected saveInternal() {
        this.storage = this.editForm.value as ProductsStorageModel;
        this.storage.totalCount = this.storage.storageDetails.reduce((a, b) => a + +b.count, 0);
        this.productsStorageService.saveStorageItem(this.storage).subscribe(success => {
            this.isProcessing = false;
            this.notificationService.success(`Состояние склада на ${this.storage.date} сохранено!`);
            this.utilsService.navigate('/pages/storage');
        }, error => {
            this.isProcessing = false;
            this.notificationService.error(`Невозможно сохранить состояние склада! ` + error);
        });
    }

    private updateEditForm() {
        if (this.storage.storageDetails.length !== 0) {
            this.storage.storageDetails.forEach(item => this.addDynamicFormControl()); // add new control for each link
        }
        this.editForm.patchValue(this.storage); // update form value
    }

    private getDynamicFormControl = (): FormGroup => this.fb.group({
        count: ["", Validators.required],
        productId: ["", Validators.required]
    });

    public addDynamicFormControl(): void {
        (<FormArray>this.editForm.controls['storageDetails']).push(this.getDynamicFormControl());
    }

    public deleteDynamicControl(controlId: number): void {
        (<FormArray>this.editForm.controls['storageDetails']).removeAt(controlId);
    }


}
