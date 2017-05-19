import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {FlavourModel} from "../../../core/models/flavour.model";
import {FlavoursService} from "../../../core/services/flavours.service";

@Component({
    selector: 'appc-flavour-list',
    templateUrl: 'flavour-list.component.html'
})
export class FlavoursListComponent extends BaseComponent  {

    public flavours: Array<FlavourModel> = [];

    constructor(private flavoursService: FlavoursService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.flavoursService.getFlavours().subscribe(success => {
            this.flavours = success.sort(this.dynamicSort('manufacturer', -1));
        });
    }

    public deleteFlavour(flavour: FlavourModel): void {
        if (confirm('Удалить данный ароматизатор?')) {
            this.flavoursService.deleteFlavour(flavour.id).subscribe(success => {
                this.removeFromObjArray(this.flavours, flavour.id);
                this.notificationService.success(`Ароматизатор ${flavour.title} успешно удалён!`);
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
