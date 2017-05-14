import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {CurrentUserService} from "../../core/services/current-user.service";
import {UtilityService} from "../../core/services/utility.service";

@Injectable()
export class CanActivateUser implements CanActivate {

    constructor(private currentUserService: CurrentUserService,
                private utilsService: UtilityService) {
    }

    canActivate() {
        if (this.currentUserService.isLoggedIn()) {
            return true;
        } else {
            console.warn('No permission for this route.');
            this.utilsService.navigateToSignIn();
            return false;
        }
    }
}
