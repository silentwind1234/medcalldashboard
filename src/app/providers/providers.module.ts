import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ProviderClient, CertificateClient, ExperienceClient } from '../core/data';
import { PageService } from '../core/services';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { ProviderDetailAddressComponent } from './provider-detail-address/provider-detail-address.component';
import { ProviderDetailBasicComponent } from './provider-detail-basic/provider-detail-basic.component';
import { ProviderDetailAuditComponent } from './provider-detail-audit/provider-detail-audit.component';
import { ProviderCertificateListComponent } from './provider-certificate-list/provider-certificate-list.component';
import { ProviderCertificateDetailComponent } from './provider-certificate-detail/provider-certificate-detail.component';
import { ProviderExperienceListComponent } from './provider-experience-list/provider-experience-list.component';
import { ProviderExperienceDetailComponent } from './provider-experience-detail/provider-experience-detail.component';
import { ProviderSpecialtyListComponent } from './provider-specialty-list/provider-specialty-list.component';
import { ProviderSpecialtyDetailComponent } from './provider-specialty-detail/provider-specialty-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CoreModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProvidersRoutingModule
  ],
  declarations: [
    ProviderListComponent,
    ProviderDetailComponent,
    ProviderDetailBasicComponent,
    ProviderDetailAddressComponent,
    ProviderDetailAuditComponent,
    ProviderCertificateListComponent,
    ProviderExperienceListComponent,
    ProviderSpecialtyListComponent,
    ProviderSpecialtyDetailComponent,
    ProviderExperienceDetailComponent,
    ProviderCertificateDetailComponent
  ],
  providers: [ProviderClient, CertificateClient, ExperienceClient, PageService],
  entryComponents: [ProviderExperienceDetailComponent, ProviderCertificateDetailComponent]
})
export class ProvidersModule { }
