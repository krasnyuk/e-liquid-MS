import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {CurrentUserService} from "../../core/services/current-user.service";
import {UtilityService} from "../../core/services/utility.service";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class CanActivateAdmin implements CanActivate {

    constructor(private currentUserService: CurrentUserService,
                private notificationService: ToastsManager,
                private utilsService: UtilityService) {
    }

    canActivate() {
        if (this.currentUserService.isAdmin()) {
            return true;
        } else {
            this.notificationService.warning('У вас нету прав доступа.');
            this.utilsService.navigateToSignIn();
            return false;
        }
    }
}
