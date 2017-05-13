import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {
        path: 'pages', loadChildren: './+pages/pages.module#PagesModule'
    },
    {
        path: 'login', loadChildren: './+login/login.module#LoginModule'
    },
    {
        path: 'register', loadChildren: './+register/register.module#RegisterModule'
    },
    {
        path: 'profile', loadChildren: './+profile/profile.module#ProfileModule'
    },
    {
        path: 'admin', loadChildren: './+admin/admin.module#AdminModule'
    },
    {
        path: 'examples', loadChildren: './+examples/examples.module#ExamplesModule'
    }
];

export const routing = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
