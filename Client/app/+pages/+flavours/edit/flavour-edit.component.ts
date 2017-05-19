import {Component} from "@angular/core";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UtilityService} from "../../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";
import {FlavourModel} from "../../../core/models/flavour.model";
import {FlavoursService} from "../../../core/services/flavours.service";
import {Lang} from "../../../core/app-lang";

@Component({
    selector: 'appc-flavour-edit',
    templateUrl: 'flavour-edit.component.html'
})
export class FlavoursEditComponent extends BaseEditForm {

    public flavour: FlavourModel = <FlavourModel> {};
    public flavourManufacturers: Array<any>;

    constructor(private router: ActivatedRoute,
                private utilsService: UtilityService,
                private fb: FormBuilder,
                private notificationService: ToastsManager,
                private flavoursService: FlavoursService) {
        super();
    }

    ngOnInit() {
        this.flavourManufacturers = Object.keys(Lang.flavourManufacturers).map(item => {
            return { key: item, value: Lang.flavourManufacturers[item]}
        });
        this.formTitle = "Добавить ароматизатор";
        this.editForm = this.fb.group({
            id: [""],
            title: ["", [Validators.maxLength(50), Validators.required]],
            manufacturer: ["", [Validators.maxLength(50), Validators.required]],
        });
        this.router.params.subscribe(params => {
            const flavourId = +params['flavourId'];
            if (flavourId) {
                this.formTitle = "Редактировать ароматизатор";
                this.flavoursService.getFlavour(flavourId).subscribe(success => {
                    this.flavour = success;
                    this.editForm.patchValue(success);
                });
            }
        });
    }

    protected saveInternal() {
        this.flavour = this.editForm.value as FlavourModel;
        this.flavoursService.saveFlavour(this.flavour).subscribe(success => {
            this.isProcessing = false;
            this.notificationService.success(`Ароматизатор сохранён успешно!`);
            this.utilsService.navigate('/pages/flavours');
        }, error => {
            this.isProcessing = false;
        });
    }
}
