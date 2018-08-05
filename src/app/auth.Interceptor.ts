import { Component, Injectable,  Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { HttpModule } from '@angular/http';
import { HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private oidcSecurityService: OidcSecurityService;

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = req;

        if (this.oidcSecurityService === undefined) {
            this.oidcSecurityService = this.injector.get(OidcSecurityService);
        }
        if (this.oidcSecurityService !== undefined) {
            const token = this.oidcSecurityService.getToken();
            if (token !== '') {
                const tokenValue = 'Bearer ' + token;
                requestToForward = req.clone({ setHeaders: { 'Authorization': tokenValue } });
            }
        } else {
            console.log('--- OidcSecurityService undefined: NO auth header!');
        }
        return next.handle(requestToForward);
    }
}
