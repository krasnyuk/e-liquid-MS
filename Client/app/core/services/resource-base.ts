import {Observable} from "rxjs/Observable";
import { HttpServiceWrapper } from "./http-service-wrapper";
declare var ENV: any;

export class ResourceBase {

    protected urlOptions: any;

    public onError: any;

    constructor(protected http: HttpServiceWrapper) {
    }

    getById(options?: any): Observable<any> {

        const params = options && options.params ? options.params : {};
        const url = this.buildUrl(this.urlOptions['getById'], params);

        return this.http.get(url, options).catch(this.handleError);
    }

    get(options?: any): Observable<any> {

        const params = options && options.params ? options.params : {};
        const url = this.buildUrl(this.urlOptions['get'], params);

        return this.http.get(url, options).catch(this.handleError.bind(this));
    }

    public save(entity: any, options?: any): Observable<any> {
        const params = options && options.params ? options.params : {};
        const url = this.buildUrl(this.urlOptions['post'], params);
        const obs = this.http.post(url, entity, options);

        return obs.catch(this.handleError.bind(this));
    }

    public update(entity: any, options?: any): Observable<any> {
        const params = options && options.params ? options.params : {};
        const url = this.buildUrl(this.urlOptions['put'], params);
        const obs = this.http.put(url, entity, options);

        return obs.catch(this.handleError.bind(this));
    }

    public delete(options: any): Observable<any> {
        const params = options && options.params ? options.params : {};
        const url = this.buildUrl(this.urlOptions['delete'], params);

        return this.http.delete(url, options).catch(this.handleError.bind(this));
    }

    protected buildUrl(urlTemplate: string, params: any): string {
        Object.keys(params).forEach(function (key) {
            if (params[key] !== undefined) {
                urlTemplate = urlTemplate.replace('{' + key + '}', params[key]);
            }
        });

        return urlTemplate;
    }

    protected handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if (error.text()) {
            const errObj = error.json();
            errMsg = errObj.errorMessage ? errMsg + '. ' + errObj.errorMessage : errMsg;
        }

        if ('production' !== ENV) {
            if (this.onError) {
                this.onError({message: errMsg});
            }
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}