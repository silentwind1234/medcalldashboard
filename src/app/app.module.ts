import { NgModule,  APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import {ConfigService} from './config.service';
import { AuthInterceptor } from './auth.Interceptor';
import { AuthorizationGuard } from './authorization.guard';
import {ROUTES} from './app.routes';
import { AppComponent } from './app.component';
import {AppviewsModule} from './views/appviews/appviews.module';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './core/data';
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { SettingsModule } from './settings/settings.module';
import { ProvidersModule } from './providers/providers.module';
import { PatientsModule } from './patients/patients.module';
import { RequestsModule } from './requests/requests.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AutologinComponent } from './autologin/autologin.component';
export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');
  return () => oidcConfigService.load_using_stsServer(environment.STS_BASE_URL);
}

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    AutologinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AuthModule.forRoot(),
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
    SettingsModule,
    ProvidersModule,
    PatientsModule,
    RequestsModule
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    OidcSecurityService,
    AuthorizationGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: API_BASE_URL, useValue: environment.API_BASE_URL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private configService: ConfigService,
    private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer = environment.STS_BASE_URL;
      openIDImplicitFlowConfiguration.redirect_url = environment.APP_BASE_URL + '/starterview/';
      openIDImplicitFlowConfiguration.client_id = 'angular-client';
      openIDImplicitFlowConfiguration.response_type = 'id_token token';
      openIDImplicitFlowConfiguration.scope = 'openid profile email medcall';
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = environment.APP_BASE_URL + '/Unauthorized/';
      openIDImplicitFlowConfiguration.post_login_route = environment.APP_BASE_URL + '/starterview/';
      openIDImplicitFlowConfiguration.forbidden_route = '/forbidden';
      openIDImplicitFlowConfiguration.unauthorized_route = '/unauthorized';
      openIDImplicitFlowConfiguration.auto_userinfo = true;
      openIDImplicitFlowConfiguration.log_console_warning_active = true;
      openIDImplicitFlowConfiguration.log_console_debug_active = !environment.production;
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 60;
      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);
      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);
    },
    error => {
      console.log('Auth Module: Error Occured in Auth Module Registration', error);
    });
    console.log('APP STARTING');
  }
}
