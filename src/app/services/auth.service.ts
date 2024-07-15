import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshTokenUrl = 'YOUR_REFRESH_TOKEN_URL';
  private authToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(response: any): void {
    try {
      if (!response || !response.authenticationToken || !response.refreshTokenExpiresOn || !response.refreshToken) {
        throw new Error("Invalid response object");
      }
      this.authToken = response.authenticationToken;
      const refreshTokenExpiresOn = new Date(response.refreshTokenExpiresOn);
      const expiresInDays = Math.floor((refreshTokenExpiresOn.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      console.log(this.authToken, refreshTokenExpiresOn, expiresInDays);
      this.cookieService.setCookie('refreshToken', response.refreshToken, expiresInDays);
    } catch (error) {
      console.error('Failed to login:', error);
      //call refresh token

    }
  }
  

  getAuthToken(): string | null {
    return this.authToken;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.cookieService.getCookie('refreshToken');
    if (!refreshToken) {
      this.router.navigate(['/login']);
      return throwError('No refresh token found');
    }

    return this.http.post(this.refreshTokenUrl, { token: refreshToken })
      .pipe(
        switchMap((response: any) => {
          this.authToken = response.authenticationToken;
          const refreshTokenExpiresOn = new Date(response.refreshTokenExpiresOn);
          const expiresInDays = Math.floor((refreshTokenExpiresOn.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          this.cookieService.setCookie('refreshToken', response.refreshToken, expiresInDays);
          return response;
        }),
        catchError(err => {
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
  }
}
