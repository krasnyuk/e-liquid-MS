import {EventEmitter, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AppConst} from "../app-constants";
import {StorageService} from "./storage.service";
import {AuthStateService} from "./auth-state.service";


@Injectable()
export class CurrentUserService {
    private static user: any;
    public onUserLogout = new EventEmitter<any>();
    public onUserLogin = new EventEmitter<any>();

    constructor(private storageService: StorageService,
                private authStateService: AuthStateService,
                private router: Router) {


        CurrentUserService.user = this.storageService.get(AppConst.storageKeys.User);
        this.authStateService.onTokenClear.subscribe(() => this.clear());
    }

    set(userDetails: any): void {
        CurrentUserService.user = userDetails;
        this.storageService.set(AppConst.storageKeys.User, CurrentUserService.user);
        this.authStateService.setToken(userDetails['token']);
        this.onUserLogin.emit(true);
    }

    get(): any {
        return CurrentUserService.user;
    }

    roleIs = (role: string): boolean => role === this.getRoleType();

    isAdmin = (): boolean => this.roleIs('Admin');

    getRoleType = (): any => this.isLoggedIn() ? CurrentUserService.user['role'] : null;

    hasRole = (roles: Array<string> = []): boolean => roles.indexOf(this.getRoleType()) !== -1;

    isLoggedIn = (): boolean => !!CurrentUserService.user;


    getDefaultRouteCommands = (): any[] => {
        const userRole = this.getRoleType();
        return userRole === null ? [] : ['pages', 'dashboard'];
    };

    redirectToLoginPage(): void {
        this.router.navigate(['login'])
    }

    redirectToDefaultPage(): void {
        const commands = this.getDefaultRouteCommands();
        if (commands.length > 0) {
            this.router.navigate(commands);
        } else {
            this.redirectToLoginPage();
        }
    }

    clear(): void {
        CurrentUserService.user = null;
        this.storageService.remove(AppConst.storageKeys.User);
        this.authStateService.setToken(null);
        this.onUserLogout.emit(null);
        this.router.navigate(['login']);
    }
}
