import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicLayoutComponent } from '../components/common/layouts/basicLayout.component';
import { AuthorizationGuard } from '../authorization.guard';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientDetailAddressComponent } from './patient-detail-address/patient-detail-address.component';
import { PatientDetailAuditComponent } from './patient-detail-audit/patient-detail-audit.component';

const routes: Routes = [
  {
    path: 'patients', component: BasicLayoutComponent, canLoad: [ AuthorizationGuard ],
    children: [
      { path: '', component: PatientListComponent },
      { path: 'create', component: PatientDetailComponent },
      { path: 'edit/:id', component: PatientDetailComponent },
      { path: 'edit/:id/audit', component: PatientDetailAuditComponent },
      { path: 'edit/:id/address', component: PatientDetailAddressComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
