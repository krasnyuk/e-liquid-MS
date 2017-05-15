import {StorageService} from "./storage.service";
import {EventEmitter} from "@angular/core"
import {Injectable} from '@angular/core';
import {AppConst} from "../app-constants";

@Injectable()
export class AuthStateService {

    private token: any;

    public onTokenClear = new EventEmitter<any>();

    constructor(private storageService: StorageService) {
        this.token = this.storageService.get(AppConst.storageKeys.XAuthToken);
    }

    public setToken(token: any) {
        this.token = token;
        if (token !== null) {
            this.storageService.set(AppConst.storageKeys.XAuthToken, token);
        } else {
            this.storageService.remove(AppConst.storageKeys.XAuthToken);
        }
    }

    public getToken() {
        return this.token;
    }

    public clearToken() {
        this.token = null;
        this.storageService.remove(AppConst.storageKeys.XAuthToken);
        this.onTokenClear.emit(null);
    }
}