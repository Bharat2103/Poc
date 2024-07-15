// File: auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.configService.loadConfig()).pipe(
        switchMap(config => {
            // Handle /login endpoint with active IP address
            if (req.url.includes('/login') && config) {
                const loginUrl = `http://${config.IP_ADDRESS}:${config.PORT}${req.url}`;
                console.log(loginUrl);
                req = req.clone({ url: loginUrl });
            }

            // Add authorization token if available
            const authToken = this.authService.getAuthToken();
            if (authToken) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            }

            return next.handle(req);
        })
    );
}
}

// Ensure the interceptor is registered globally
export const interceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
