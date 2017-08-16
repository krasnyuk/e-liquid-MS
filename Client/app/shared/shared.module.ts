import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {HttpModule, JsonpModule} from "@angular/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {DynamicFormComponent} from "./forms/dynamic-form.component";
import {DynamicFormControlComponent} from "./forms/dynamic-form-control.component";
import {ErrorMessageComponent} from "./forms/error-message.component";
import {ErrorSummaryComponent} from "./forms/error-summary.component";
import {FormControlService} from "./forms/form-control.service";


import {HeaderComponent} from "./layout/header.component";
import {FooterComponent} from "./layout/footer.component";

import {UppercasePipe} from "./pipes/uppercase.pipe";
// Services
import {NavbarComponent} from "./components/navbar.component";
import {CanActivateUser} from "./guards/user-can-activate.guard";
import {CanActivateAdmin} from "./guards/admin-can-activate.guard";
import {FilterPipe} from "./pipes/filter.pipe";
import {AppBuildComponent} from "./components/app-build/app-build.component";

const components: Array<any> = [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorMessageComponent,
    ErrorSummaryComponent,
    FooterComponent,
    HeaderComponent,
    UppercasePipe,
    FilterPipe,
    NavbarComponent,
    AppBuildComponent
];

const services = [
    FormControlService,
    CanActivateUser,
    CanActivateAdmin
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        NgbModule.forRoot(),
        // No need to export as these modules don't expose any components/directive etc'
        HttpModule,
        JsonpModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        TranslateModule,
        ...components
    ]

})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ...services
            ]
        };
    }
}
