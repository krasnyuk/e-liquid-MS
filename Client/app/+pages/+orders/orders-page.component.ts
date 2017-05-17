import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'appc-orders-page',
    template: `
        <router-outlet></router-outlet>`
})
export class OrdersPageComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
