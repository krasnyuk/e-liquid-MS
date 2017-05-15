import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../core/services/current-user.service";
import {AccountService} from "../../core/account/account.service";

@Component({
    selector: 'appc-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    public userModel: any = {
        name: ""
    };

    constructor(private currentUserService: CurrentUserService,
                private accountService: AccountService) {
        this.userModel = this.currentUserService.get();
    }

    ngOnInit() {
    }

    public logout(): void {
        this.accountService.logout();
    }
}
