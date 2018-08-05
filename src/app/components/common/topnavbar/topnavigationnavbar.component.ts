import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';


import {Router} from '@angular/router';
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery: any;

@Component({
  selector: 'app-top-navigationnav-bar',
  templateUrl: 'topnavigationnavbar.template.html'
})

export class TopNavigationNavbarComponent implements OnInit, OnDestroy {

  isCollapsed: Boolean = true;
  isAuthorizedSubscription: Subscription;
  isAuthorized: Boolean = false;

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  login() {
    console.log('-- login');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('-- logout');
    this.oidcSecurityService.logoff();
  }

  constructor( public oidcSecurityService: OidcSecurityService) {

    /*
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
    */
  }


  ngOnInit(): void {
    /*
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      });
      */
  }

  private doCallbackLogicIfRequired() {
    if (window.location.hash) {
      this.oidcSecurityService.authorizedCallback();
    }
  }

  ngOnDestroy(): void {
    // this.oidcSecurityService.onModuleSetup.unsubscribe();
  }

}
