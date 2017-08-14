import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import {AppConst} from "../app-constants";
import {SystemConfig} from "../system-config";
import {AuthStateService} from "./auth-state.service";

@Injectable()
export class HttpServiceWrapper {

    private serverAddress: string;

    constructor(private http: Http,
                private authStateService: AuthStateService) {
        this.serverAddress = SystemConfig.getServerAddress();
    }

    post(url: string, body: any, options?: any): Observable<Response> {

        const requestOptions = this.processOptions(options);
        const requestBody = JSON.stringify(body);
        const result = this.http.post(this.serverAddress + '/' + url, requestBody, requestOptions);
        if (options && options.noIntercept) {
            return result.map(this.extractJSON);
        }
        return this.intercept(result).map(this.tryExtractJSON);
    }

    put(url: string, body: any, options?: any): Observable<Response> {

        const requestOptions = this.processOptions(options);
        const requestBody = JSON.stringify(body);
        const result = this.http.put(this.serverAddress + '/' + url, requestBody, requestOptions);
        if (options && options.noIntercept) {
            return result.map(this.extractJSON);
        }
        return this.intercept(result).map(this.tryExtractJSON);
    }

    get(url: string, options?: any): Observable<Response> {

        const requestOprions = this.processOptions(options);
        requestOprions.headers.delete('Content-Type');

        const result = this.http.get(this.serverAddress + '/' + url, requestOprions);
        return this.intercept(result).map(this.tryExtractJSON);
    }

    patch(url: string, body: any, options?: any): Observable<Response> {

        const requestOptions = this.processOptions(options);
        const requestBody = JSON.stringify(body);
        const response = this.http.patch(this.serverAddress + '/' + url, requestBody, requestOptions);

        return this.intercept(response).map(this.extractJSON);
    }

    delete(url: string, options?: any) {
        const requestOprions = this.processOptions(options);
        requestOprions.headers.delete('Content-Type');

        const result = this.http.delete(this.serverAddress + '/' + url, requestOprions);

        return this.intercept(result);
    }

    protected processOptions(options: any) {

        const requestOptions = this.createOptions();

        if (!options) {
            return requestOptions;
        }

        if (options.search) {
            const search = new URLSearchParams();
            Object.keys(options.search).forEach(function (key) {
                if (options.search[key] !== undefined) {
                    search.set(key, options.search[key].toString());
                }
            });

            requestOptions.search = search;
        }
        return requestOptions;
    }

    private createOptions(): RequestOptions {

        const headers = new Headers({'Content-Type': 'application/json'});

        const authKey = this.authStateService.getToken();
        if (authKey) {
            headers.append(AppConst.storageKeys.XAuthToken, authKey);
        }

        const options = new RequestOptions({headers: headers});

        return options;
    }

    private extractJSON(response: Response) {
        return response.json();
    }

    private tryExtractJSON(response: Response) {
        return response.text() ? response.json() : {};
    }

    private intercept(observable: Observable<Response>): Observable<Response> {
        return observable
            .map((response: Response) => {
                const token = response.headers.get(AppConst.storageKeys.XAuthToken);
                if (token) {
                    this.authStateService.setToken(token);
                }
                return response;
            })
            .catch((error) => {
                if (error.status === 0) { // 401
                    this.authStateService.clearToken();
                    return Observable.of();
                } else {
                    return Observable.throw(error);
                }
            });
    }
}
