import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

import { RequestClient } from '../core/data';
import { PageService } from '../core/services';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CoreModule,
    RequestsRoutingModule
  ],
  declarations: [RequestListComponent, RequestDetailComponent],
  providers: [RequestClient, PageService]
})
export class RequestsModule { }
