import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {FlavourModel} from "../models/flavour.model";

@Injectable()
export class FlavoursService {
    private baseUrl = 'api/flavour';

    constructor(private dataService: DataService) {
    }

    public getFlavours(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getFlavour(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteFlavour(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveFlavour(flavourModel: FlavourModel): Observable<any> {
        if (!flavourModel.id) {
            flavourModel.id = 0;
            return this.createFlavour(flavourModel);
        }
        return this.updateFlavour(flavourModel);
    }

    private createFlavour(flavourModel: FlavourModel): Observable<any> {
        return this.dataService.post(this.baseUrl, flavourModel);
    }

    private updateFlavour(flavourModel: FlavourModel): Observable<any> {
        const url = `${this.baseUrl}/${flavourModel.id}`;
        return this.dataService.put(url, flavourModel);
    }

}