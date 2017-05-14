import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {HttpModule, JsonpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {PageHeadingComponent} from './directives/page-heading.directive';
import {DynamicFormComponent} from './forms/dynamic-form.component';
import {DynamicFormControlComponent} from './forms/dynamic-form-control.component';
import {ErrorMessageComponent} from './forms/error-message.component';
import {ErrorSummaryComponent} from './forms/error-summary.component';
import {FormControlService} from './forms/form-control.service';


import {HeaderComponent} from './layout/header.component';
import {FooterComponent} from './layout/footer.component';

import {UppercasePipe} from './pipes/uppercase.pipe';

// Services
import {ContentService} from './services/content.service';
import {NavbarComponent} from "./components/navbar.component";

const components: Array<any> = [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorMessageComponent,
    ErrorSummaryComponent,
    FooterComponent,
    HeaderComponent,
    PageHeadingComponent,
    UppercasePipe,
    NavbarComponent
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
                FormControlService,
                ContentService
            ]
        };
    }
}
