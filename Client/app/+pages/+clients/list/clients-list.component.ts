import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {ClientModel} from "../../../core/models/client.model";
import {ClientsService} from "../../../core/services/clients.service";

@Component({
    selector: 'appc-clients-list',
    templateUrl: 'clients-list.component.html'
})
export class ClientsListComponent extends BaseComponent {

    public clients: Array<ClientModel> = [];

    constructor(private clientsService: ClientsService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.clientsService.getClients().subscribe((success: Array<any>) => {
            this.clients = success.sort((a, b) => {
                return (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0);
            });
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
