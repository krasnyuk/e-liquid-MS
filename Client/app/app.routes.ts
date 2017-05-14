import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'pages',
        loadChildren: './+pages/pages.module#PagesModule'
    },
    {
        path: 'login', loadChildren: './+login/login.module#LoginModule'
    },
    {
        path: 'register', loadChildren: './+register/register.module#RegisterModule'
    },
    {
        path: 'admin', loadChildren: './+admin/admin.module#AdminModule'
    },
    {
        path: 'examples', loadChildren: './+examples/examples.module#ExamplesModule'
    }
];

export const routing = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
