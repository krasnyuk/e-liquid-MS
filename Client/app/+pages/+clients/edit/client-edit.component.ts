import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";
import {ClientModel} from "../../../core/models/client.model";
import {ClientsService} from "../../../core/services/clients.service";
import {AppConst} from "../../../core/app-constants";

@Component({
    selector: 'appc-client-edit',
    templateUrl: 'client-edit.component.html'
})
export class ClientEditComponent extends BaseEditForm {

    public client: ClientModel = <ClientModel> {};
    public clientStatuses: Array<any> = [];

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private clientsService: ClientsService) {
        super();
    }

    ngOnInit() {
        this.clientStatuses = Object.keys(AppConst.clientStatus).map((item: any) => {
            return {key: item, value: AppConst.clientStatus[item]};
        });
        this.formTitle = "Добавить клиента";
        this.editForm = this.fb.group({
            id: [""],
            name: ["", [Validators.required, Validators.maxLength(100)]],
            physicAddress: ["", [Validators.required, Validators.maxLength(150)]],
            shippingAddress: ["", [Validators.required, Validators.maxLength(150)]],
            contactPerson: ["", [Validators.required, Validators.maxLength(100)]],
            phone: ["", [Validators.required, Validators.maxLength(15)]],
            secondaryPhone: ["", Validators.maxLength(15)],
            status: ["", [Validators.required]],
            info: ["", Validators.maxLength(255)],
            clientLinks: this.fb.array([])
        });
        this.router.params.subscribe(params => {
            const clientId = +params['clientId'];
            if (clientId) {
                this.formTitle = "Редактировать клиента";
                this.clientsService.getClient(clientId).subscribe(success => {
                    this.client = success;
                    this.updateEditForm();
                });
            } else {
                this.addOtherLinkFormControl();
            }
        });
    }

    private updateEditForm() {
        if (this.client.clientLinks.length === 0) {
            this.addOtherLinkFormControl(); // set default control
        } else {
            this.client.clientLinks.forEach(item => this.addOtherLinkFormControl()); // add new control for each link
        }
        this.editForm.patchValue(this.client); // update form value
    }

    private getOtherLinkFormControl = (): FormGroup => this.fb.group({
        id: [""],
        link: [""],
        clientId: [""]
    });

    public addOtherLinkFormControl(): void {
        (<FormArray>this.editForm.controls['clientLinks']).push(this.getOtherLinkFormControl());
    }

    public deleteLink(controlId: number): void {
        (<FormArray>this.editForm.controls['clientLinks']).removeAt(controlId);
    }

    protected saveInternal() {
        this.client = this.editForm.value as ClientModel;
        this.clientsService.saveClient(this.client).subscribe(success => {
            this.isProcessing = false;
            this.notificationService.success(`Клиент ${this.client.name} сохранён!`);
            this.utilsService.navigate('/pages/clients');
        }, error => {
            this.isProcessing = false;
        });
    }
}
