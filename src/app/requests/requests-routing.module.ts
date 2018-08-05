import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../authorization.guard';

import {BasicLayoutComponent} from '../components/common/layouts/basicLayout.component';

import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';

const routes: Routes = [
  {
    path: 'requests', component: BasicLayoutComponent, canActivate: [AuthorizationGuard],
    children: [
      { path: ':flag', component: RequestListComponent },
      { path: ':flag/create', component: RequestDetailComponent },
      { path: ':flag/edit/:id', component: RequestDetailComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
