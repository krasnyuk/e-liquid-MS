import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../core/services/products.service";
import {ProductModel} from "../../../core/models/product.model";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'appc-products-edit',
    templateUrl: 'products-edit.component.html'
})
export class ProductsEditComponent extends BaseEditForm {

    public product: ProductModel = <ProductModel> {};

    constructor(private router: ActivatedRoute,
                private fb: FormBuilder,
                private productsService: ProductsService) {
        super();
    }

    ngOnInit() {
        this.formTitle = "Добавить продукт";
        this.editForm = this.fb.group({
            id: [""],
            name: ["", [Validators.maxLength(100), Validators.required]],
            volume: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
            nicotineAmount: ["", Validators.required],
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
            debugger;
        }, error => {
            this.isProcessing = false;
        });
    }
}
