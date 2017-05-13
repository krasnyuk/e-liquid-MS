import {Injectable} from '@angular/core';
import {AppConst} from "../app-constants";


@Injectable()
export class StorageService {
    private storage: any;
    private storageSupported: boolean;
    private type: string;

    constructor() {
        this.storage = {};
        this.type = AppConst.storageTypes.sessionStorage;
        this.storageSupported = this._isStorageSupported(this.type);

        if (this.storageSupported) {
            this._determineCurrentStorageType();
        }
    }

    get(key: string) {
        if (this.storage[key]) {
            return this.storage[key];
        }

        if (this.storageSupported && window[this.type][key]) {
            this.storage[key] = JSON.parse(window[this.type][key]);
        }

        return this.storage[key];
    }

    set(key, data) {
        this.storage[key] = data;


        if (this.storageSupported) {
            window[this.type][key] = JSON.stringify(data);
        }
    }

    /***
     * Removes specified item from localStorage
     * @param key {string}
     */
    remove(key) {
        if (this.storageSupported) {
            delete window[this.type][key];
        }

        delete this.storage[key];
    };

    moveToStorage(destType) {
        if (this._isStorageSupported(destType)) {
            for (var prop in window[this.type]) {
                window[destType][prop] = window[this.type][prop];

                delete window[this.type][prop];
            }

            this.type = destType;
        }
    }

    switchToPermanentStorage() {
        this.moveToStorage(AppConst.storageTypes.localStorage);
    }

    switchToTemporaryStorage() {
        if (this.type !== AppConst.storageTypes.sessionStorage) {
            this.moveToStorage(AppConst.storageTypes.sessionStorage);
        }
    }

    _isStorageSupported(type) {
        return type in window && window[type] !== null && this.isLocalStorageAccessible(type);
    }

    _determineCurrentStorageType() {
        this.type = AppConst.storageTypes.sessionStorage;
        for (var prop in AppConst.storageTypes) {
            var type = AppConst.storageTypes[prop];
            if (this._isStorageSupported(type) && Object.keys(window[type]).length) {
                this.type = type;
                break;
            }
        }
    }

    /**
     * Test set/remove from LS.
     * Required for Safari on Iphone in private mode
     * @param type
     * @returns {boolean}
     */
    isLocalStorageAccessible(type) {
        let testKey: string = 'test'
        let storage: any = window[type];
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        }
        catch (error) {
            return false;
        }
    }

}