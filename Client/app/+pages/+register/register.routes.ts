import {RouterModule, Routes} from "@angular/router";

import {RegisterComponent} from "./+register/register.component";

const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent}
];

export const routing = RouterModule.forChild(routes);
