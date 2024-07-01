import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from '../src/app/services/cookie.service';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
// import { environment } from './environments/environment';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

// if (environment.production) {
//   enableProdMode();
// }

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
});
