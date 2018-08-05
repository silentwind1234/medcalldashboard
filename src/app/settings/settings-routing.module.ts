import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../authorization.guard';

import {BasicLayoutComponent} from '../components/common/layouts/basicLayout.component';

import { PricerangeListComponent } from './pricerange/pricerange-list/pricerange-list.component';
import { PricerangeDetailComponent } from './pricerange/pricerange-detail/pricerange-detail.component';
import { SpecialtyListComponent } from './specialty/specialty-list/specialty-list.component';
import { SpecialtyDetailComponent } from './specialty/specialty-detail/specialty-detail.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: 'settings', component: BasicLayoutComponent, canActivate: [AuthorizationGuard],
    children: [

      { path: 'priceranges', component: PricerangeListComponent},
      { path: 'priceranges/create', component: PricerangeDetailComponent },
      { path: 'priceranges/edit/:id', component: PricerangeDetailComponent },

      { path: 'specialties',
        children: [
          { path: ':flag', component: SpecialtyListComponent },
          { path: ':flag/create', component: SpecialtyDetailComponent },
          { path: ':flag/edit/:id', component: SpecialtyDetailComponent }
        ]

      },

      { path: 'countries', component: CountryListComponent},
      { path: 'countries/create', component: CountryDetailComponent },
      { path: 'countries/edit/:id', component: CountryDetailComponent },

      { path: 'cities', component: CityListComponent },
      { path: 'cities/create', component: CityDetailComponent },
      { path: 'cities/edit/:id', component: CityDetailComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
