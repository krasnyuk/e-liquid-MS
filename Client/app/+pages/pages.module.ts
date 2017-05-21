import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {pagesRouting} from "./pages.routing";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import { ChartModule } from 'angular2-highcharts';

@NgModule({
    imports: [
        SharedModule,
        pagesRouting,
        ChartModule.forRoot(require('highcharts'))
    ],
    declarations: [
        PagesComponent,
        DashboardComponent
    ],
})
export class PagesModule {
}
