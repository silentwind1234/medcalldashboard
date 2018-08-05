import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryClient, CityClient, PricerangeClient, SpecialtyClient } from '../core/data';

import { SettingsRoutingModule } from './settings-routing.module';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { PricerangeListComponent } from './pricerange/pricerange-list/pricerange-list.component';
import { PricerangeDetailComponent } from './pricerange/pricerange-detail/pricerange-detail.component';
import { SpecialtyListComponent } from './specialty/specialty-list/specialty-list.component';
import { SpecialtyDetailComponent } from './specialty/specialty-detail/specialty-detail.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SettingsRoutingModule
  ],
  declarations: [
    CountryListComponent,
    CountryDetailComponent,
    CityListComponent,
    CityDetailComponent,
    PricerangeListComponent,
    PricerangeDetailComponent,
    SpecialtyListComponent,
    SpecialtyDetailComponent
  ],
  providers: [CountryClient, CityClient, PricerangeClient, SpecialtyClient]
})
export class SettingsModule { }
