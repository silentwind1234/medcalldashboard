import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

import { PatientClient } from '../core/data';
import { PageService } from '../core/services';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientDetailAddressComponent } from './patient-detail-address/patient-detail-address.component';
import { PatientDetailAuditComponent } from './patient-detail-audit/patient-detail-audit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CoreModule,
    PatientsRoutingModule
  ],
  declarations: [PatientListComponent, PatientDetailComponent, PatientDetailAddressComponent, PatientDetailAuditComponent],
  providers: [PatientClient, PageService]
})
export class PatientsModule { }
