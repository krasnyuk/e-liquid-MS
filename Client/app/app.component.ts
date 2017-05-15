import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";

import {AppState} from "./app-store";
import {AuthState} from "./core/auth-store/auth.store";
import {AuthTokenService} from "./core/services/auth-token/auth-token.service";

@Component({
    selector: 'appc-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private authState$: Observable<AuthState>;

    constructor(public titleService: Title,
                private tokens: AuthTokenService,
                private store: Store<AppState>) {
    }

    public ngOnInit() {
        this.setTitle('E-liquid MS');
        this.authState$ = this.store.select(state => state.auth);

        // This starts up the token refresh preocess for the app
        this.tokens.startupTokenRefresh().subscribe(
            () => console.info('Startup success'),
            error => console.warn(error)
        );
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
