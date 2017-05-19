import {NgModule} from '@angular/core';
import {flavoursRouting} from "./flavours.routing";
import {SharedModule} from "../../shared/shared.module";
import {FlavoursPageComponent} from "./flavours-page.component";
import {FlavoursListComponent} from "./list/flavours-list.component";
import {FlavoursEditComponent} from "./edit/flavour-edit.component";

@NgModule({
    imports: [
        SharedModule,
        flavoursRouting
    ],
    exports: [],
    declarations: [
        FlavoursPageComponent,
        FlavoursListComponent,
        FlavoursEditComponent
    ],
    providers: [],
})
export class FlavoursModule {
}
