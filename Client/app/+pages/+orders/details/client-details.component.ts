import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../../core/services/clients.service";
import {ClientModel} from "../../../core/models/client.model";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../../core/base/base-component";

@Component({
    selector: 'appc-details-client',
    templateUrl: 'client-details.component.html',
    styles: [`
        li {
            list-style: none;
            margin-bottom:10px;
        }
    `]
})
export class ClientDetailsComponent extends BaseComponent implements OnInit {

    public client: ClientModel = <ClientModel> {};

    constructor(private clientsService: ClientsService,
                private router: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.router.params.subscribe(params => {
            const clientId = +params['clientId'];
            if (clientId) {
                this.clientsService.getClient(clientId).subscribe(success => {
                    this.client = success;
                }, error => {});
            }
        });
    }
}
