import {Routes} from '@angular/router';
import {StarterViewComponent} from './views/appviews/starterview.component';
import {LoginComponent} from './views/appviews/login.component';
import {BlankLayoutComponent} from './components/common/layouts/blankLayout.component';
import {BasicLayoutComponent} from './components/common/layouts/basicLayout.component';
import { AuthorizationGuard } from './authorization.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AutologinComponent } from './autologin/autologin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


export const ROUTES: Routes = [
  {path: '', redirectTo: 'starterview', pathMatch: 'full', canActivate: [AuthorizationGuard]},
  {
    path: 'dashboards', component: BasicLayoutComponent
  },
  {
    path: '', component: BasicLayoutComponent, canActivate: [AuthorizationGuard],
    children: [
      {path: 'starterview', component: StarterViewComponent}
    ]
  },
  { path: 'autologin', component: AutologinComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'providers', loadChildren: './providers/providers.module#ProvidersModule'
  },
  {
    path: 'patients', loadChildren: './patients/patients.module#PatientsModule'
  },

  {
    path: 'settings', loadChildren: './settings/settings.module#SettingsModule'
  },

  {path: '**',  redirectTo: 'starterview', canActivate: [AuthorizationGuard]}
];
