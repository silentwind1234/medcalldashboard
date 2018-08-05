import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {BsDropdownModule} from 'ngx-bootstrap';

import {BasicLayoutComponent} from './basicLayout.component';
import {BlankLayoutComponent} from './blankLayout.component';
// import {TopNavigationLayoutComponent} from './topNavigationlayout.component';

import {NavigationComponent} from './../navigation/navigation.component';
import {FooterComponent} from './../footer/footer.component';
import {TopNavbarComponent} from './../topnavbar/topnavbar.component';
import {TopNavigationNavbarComponent} from './../topnavbar/topnavigationnavbar.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    // TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    // TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
})

export class LayoutsModule {}
