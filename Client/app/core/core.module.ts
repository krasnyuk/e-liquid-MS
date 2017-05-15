import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthTokenService } from './services/auth-token/auth-token.service';
import { LoggedInActions } from './auth-store/logged-in.actions';
import { ProfileActions } from './profile/profile.actions';
import { AuthTokenActions } from './services/auth-token/auth-token.actions';
import { AuthReadyActions } from './auth-store/auth-ready.actions';
// Services
import { AccountService } from './account/account.service';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';
import {StorageService} from "./services/storage.service";
import {CurrentUserService} from "./services/current-user.service";
import {AuthStateService} from "./services/auth-state.service";
import {ProductsService} from "./services/products.service";

@NgModule({
    imports: [
    ],
    exports: [
    ],
    providers: []
})
export class CoreModule {
    // forRoot allows to override providers
    // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                // Providers
                Title,
                AuthTokenService,
                AccountService,
                LoggedInActions,
                ProfileActions,
                AuthTokenActions,
                AuthReadyActions,
                DataService,
                UtilityService,
                StorageService,
                CurrentUserService,
                AuthStateService,
                ProductsService
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
