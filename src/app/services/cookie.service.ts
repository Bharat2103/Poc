import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CookieService {

  public getCookie(name: string): string | undefined {
    const cookie = document.cookie
      .split(";")
      .map(cookieString => cookieString.trim().split("="))
      .find(([cookieName]) => cookieName === name);

    return cookie ? cookie[1] : undefined;
  }

  public setCookie(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    const cookieValue = `${name}=${value}${expires}`
    document.cookie = cookieValue;
  }

  public removeCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }
}
