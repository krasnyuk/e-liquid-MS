import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {ClientModel} from "../../../core/models/client.model";
import {ClientsService} from "../../../core/services/clients.service";
import {AppConst} from "../../../core/app-constants";
import {Lang} from "../../../core/app-lang";

@Component({
    selector: 'appc-clients-list',
    templateUrl: 'clients-list.component.html'
})
export class ClientsListComponent extends BaseComponent {

    public clients: Array<ClientModel> = [];
    public clientNameFilterPattern: string;
    public clientStatusFilterPattern: string;
    public availableClientStatuses: Array<any> = [];

    constructor(private clientsService: ClientsService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.clientsService.getClients().subscribe((success: Array<any>) => {
            this.clients = success.sort(this.dynamicSort('status'));
        });
        this.availableClientStatuses = Object.keys(AppConst.clientStatus).map((item: any) => {
            return {key: item, value: Lang.clientStatus[item]};
        });
    }

    public deleteClient(client: ClientModel): void {
        if (confirm('Удалить данного клиента?')) {
            this.clientsService.deleteClient(client.id).subscribe(success => {
                this.removeFromObjArray(this.clients, client.id);
                this.notificationService.success(`Клиент ${client.name} успешно удалён!`);
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
