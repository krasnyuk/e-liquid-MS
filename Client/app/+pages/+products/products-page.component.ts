import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'appc-products-page',
    template: `
        <router-outlet></router-outlet>`
})
export class ProductsPageComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
