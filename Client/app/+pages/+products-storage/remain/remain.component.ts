import {Component, OnInit} from '@angular/core';
import {ProductsStorageService} from "../../../core/services/products-storage.service";

@Component({
    selector: 'appc-remain-products',
    templateUrl: 'remain.component.html'
})
export class RemainComponent implements OnInit {
    public currentStorageProducts: Array<any> = [];

    constructor(private storageService: ProductsStorageService) {
    }

    ngOnInit() {
        this.storageService.getCurrentStorageState().subscribe(success => {
            this.currentStorageProducts = success;
        }, error => {

        });
    }

    formatRemainCount(remainCount: number) {
        if (remainCount >= 0) {
            return remainCount;
        } else {
            return `Не хватает ${remainCount * -1}`;
        }
    }
}
