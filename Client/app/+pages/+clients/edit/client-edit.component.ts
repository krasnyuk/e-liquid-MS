import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../core/services/products.service";
import {ProductModel} from "../../../core/models/product.model";
import {FormBuilder, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'appc-client-edit',
    templateUrl: 'client-edit.component.html'
})
export class ClientEditComponent extends BaseEditForm {

    public product: ProductModel = <ProductModel> {};

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private productsService: ProductsService) {
        super();
    }

    ngOnInit() {
        this.formTitle = "Добавить продукт";
        this.editForm = this.fb.group({
            id: [""],
            name: ["", [Validators.maxLength(100), Validators.required]],
            volume: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
            nicotineAmount: ["", [Validators.required, Validators.pattern("[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?")]],
            info: ["", Validators.maxLength(255)]
        });
        this.router.params.subscribe(params => {
            const productId = +params['productId'];
            if (productId) {
                this.formTitle = "Редактировать продукт";
                this.productsService.getProduct(productId).subscribe(success => {
                    this.product = success;
                    this.editForm.patchValue(success);
                });
            }
        });
    }

    protected saveInternal() {
        this.product = this.editForm.value as ProductModel;
        this.productsService.saveProduct(this.product).subscribe(success => {
            this.isProcessing = false;
            this.notificationService.success('Продукт сохранён!');
            this.utilsService.navigate('/pages/products');
        }, error => {
            this.isProcessing = false;
        });
    }
}
