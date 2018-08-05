import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';


import {Router} from '@angular/router';
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery: any;

@Component({
  selector: 'app-top-navbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent implements OnInit, OnDestroy {

  isCollapsed: Boolean = true;
  isAuthorizedSubscription: Subscription;
  isAuthorized: Boolean = false;

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  login() {
    console.log('-------------- login');
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    console.log('-------------- refresh');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('-------------- logout');
    this.oidcSecurityService.logoff();
  }

  constructor( public oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      });
  }

  ngOnDestroy(): void {
    this.oidcSecurityService.onModuleSetup.unsubscribe();
  }

}
