import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {pagesRouting} from "./pages.routing";

@NgModule({
    imports: [SharedModule, pagesRouting],
    declarations: [],
})
export class PagesModule {
}
