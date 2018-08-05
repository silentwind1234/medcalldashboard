import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* ------------------ Enums -------*/
import {
  Gender,
  MaritalStatus,
  UserType,
  RequestStatus,
  PaymentMethod,
  ProviderType
} from './enums';

const ENUMS = [
  Gender,
  MaritalStatus,
  UserType,
  RequestStatus,
  PaymentMethod,
  ProviderType
];

/* ------------------ Pipes -------*/
import {
  GenderStringPipe,
  MaritalStatusStringPipe,
  UserTypeStringPipe,
  RequestStatusStringPipe,
  PaymentMethodStringPipe,
  ProviderTypeStringPipe
} from './pipes';


const PIPES = [
  GenderStringPipe,
  MaritalStatusStringPipe,
  UserTypeStringPipe,
  RequestStatusStringPipe,
  PaymentMethodStringPipe,
  ProviderTypeStringPipe
];

import { PageService } from './services';

@NgModule({
  imports: [CommonModule],
  exports: [...PIPES],
  declarations: [...PIPES],
  providers: [PageService]
})
export class CoreModule { }
