import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../authorization.guard';

import {BasicLayoutComponent} from '../components/common/layouts/basicLayout.component';

import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';

import { ProviderDetailBasicComponent } from './provider-detail-basic/provider-detail-basic.component';
import { ProviderDetailAddressComponent } from './provider-detail-address/provider-detail-address.component';
import { ProviderDetailAuditComponent } from './provider-detail-audit/provider-detail-audit.component';

import { ProviderCertificateListComponent } from './provider-certificate-list/provider-certificate-list.component';
import { ProviderCertificateDetailComponent } from './provider-certificate-detail/provider-certificate-detail.component';

import { ProviderExperienceListComponent } from './provider-experience-list/provider-experience-list.component';
import { ProviderExperienceDetailComponent } from './provider-experience-detail/provider-experience-detail.component';

import { ProviderSpecialtyListComponent } from './provider-specialty-list/provider-specialty-list.component';
import { ProviderSpecialtyDetailComponent } from './provider-specialty-detail/provider-specialty-detail.component';


const routes: Routes = [
  {
    path: 'providers', component: BasicLayoutComponent, canActivate: [AuthorizationGuard],
    children: [
      { path: ':flag', component: ProviderListComponent },
      { path: ':flag/create', component: ProviderDetailComponent },
      { path: ':flag/edit/:id', component: ProviderDetailComponent },
      { path: ':flag/edit/:id/audit', component: ProviderDetailAuditComponent },
      { path: ':flag/edit/:id/address', component: ProviderDetailAddressComponent },
      { path: ':flag/edit/:id/certificates', component: ProviderCertificateListComponent },
      { path: ':flag/edit/:id/specialties', component: ProviderSpecialtyListComponent },
      { path: ':flag/edit/:id/experiences', component: ProviderExperienceListComponent },
      // { path: ':flag/edit/location/:id', component: ProviderDetailLocationComponent },
      // { path: ':flag/edit/specialties/:id', component: ProviderDetailSpecialtiesComponent },
      // { path: ':flag/edit/certificates/:id', component: ProviderDetailCertificateListComponent },
      // { path: ':flag/edit/experiences/:id', component: ProviderDetailExperienceListComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
