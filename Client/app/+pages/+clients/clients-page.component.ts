import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'appc-clients-page',
    template: `
        <router-outlet></router-outlet>`
})
export class ClientsPageComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
