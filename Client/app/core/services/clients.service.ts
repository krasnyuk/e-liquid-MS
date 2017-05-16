import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {ClientModel} from "../models/client.model";

@Injectable()
export class ClientsService {
    private baseUrl = 'api/client';

    constructor(private dataService: DataService) {
    }

    public getClients(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getClient(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteClient(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveClient(clientModel: ClientModel): Observable<any> {
        if (!clientModel.id) {
            clientModel.id = 0;
            return this.createClient(clientModel);
        }
        return this.updateClient(clientModel);
    }

    private createClient(clientModel: ClientModel): Observable<any> {
        const clientDTO = {
            client: clientModel,
            links: clientModel.clientLinks.map(item => item.link)
        };
        delete clientDTO.client.clientLinks;
        return this.dataService.post(this.baseUrl, clientDTO);
    }

    private updateClient(clientModel: ClientModel): Observable<any> {
        clientModel.clientLinks.map(item => item.clientId = clientModel.id);
        clientModel.clientLinks.map(item => item.id = !item.id ? -1 : item.id);
        const url = `${this.baseUrl}/${clientModel.id}`;
        return this.dataService.put(url, clientModel);
    }

}
