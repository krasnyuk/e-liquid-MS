import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";
import {ClientModel} from "../../../core/models/client.model";
import {ClientsService} from "../../../core/services/clients.service";
import {OrderModel} from "../../../core/models/order.model";
import {OrdersService} from "../../../core/services/orders.service";
import {ProductModel} from "../../../core/models/product.model";
import {ProductsService} from "../../../core/services/products.service";

@Component({
    selector: 'appc-order-edit',
    templateUrl: 'order-edit.component.html'
})
export class OrderEditComponent extends BaseEditForm {

    public order: OrderModel = <OrderModel> {};
    public clientAvailable: Array<ClientModel> = [];
    public productsAvailable: Array<ProductModel>;

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private productsService: ProductsService,
                private ordersService: OrdersService,
                private clientsService: ClientsService) {
        super();
    }

    ngOnInit() {
        this.productsService.getProducts().subscribe(success => {
            this.productsAvailable = success;
        }, error => {
            this.notificationService.error(error);
        });
        this.clientsService.getClients().subscribe(success => {
            this.clientAvailable = success;
        }, error => {
            this.notificationService.error(error);
        });
        this.formTitle = "Новый заказ";
        this.editForm = this.fb.group({
            id: [""],
            date: [""],
            info: ["", [Validators.required, Validators.maxLength(255)]],
            realization: ["", Validators.required],
            payment: ["", Validators.required],
            clientId: ["", Validators.required],
            orderDetails: this.fb.array([])
        });
        this.router.params.subscribe(params => {
            const orderId = +params['orderId'];
            if (orderId) {
                this.formTitle = "Редактировать заказ";
                this.ordersService.getOrder(orderId).subscribe(success => {
                    this.order = success;
                    this.updateEditForm();
                });
            } else {
                this.addDynamicFormControl();
            }
        });
    }

    protected saveInternal() {
        this.order = this.editForm.value as OrderModel;
        this.ordersService.saveOrder(this.order).subscribe(success => {
            this.isProcessing = false;
            this.notificationService.success(`Заказ ${this.order.id} сохранён!`);
            this.utilsService.navigate('/pages/orders');
        }, error => {
            this.isProcessing = false;
            this.notificationService.error(`Невозможно сохранить заказ! ` + error);
        });
    }

    private updateEditForm() {
        if (this.order.orderDetails.length !== 0) {
            this.order.orderDetails.forEach(item => this.addDynamicFormControl()); // add new control for each link
        }
        this.editForm.patchValue(this.order); // update form value
    }

    private getOtherLinkFormControl = (): FormGroup => this.fb.group({
        count: ["", Validators.required],
        price: ["", Validators.required],
        productId: ["", Validators.required]
    });

    public addDynamicFormControl(): void {
        (<FormArray>this.editForm.controls['orderDetails']).push(this.getOtherLinkFormControl());
    }

    public deleteDynamicControl(controlId: number): void {
        (<FormArray>this.editForm.controls['orderDetails']).removeAt(controlId);
    }


}
