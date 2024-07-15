// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Config {
    name: string;
    IP_ADDRESS: string;
    Active: string;
    Type: string;
    Is_Authenticated: string;
    PORT: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private configUrl = 'assets/config.json';
    private activeConfig: Config | null = null;

    constructor(private http: HttpClient) {}

    loadConfig(): Observable<Config | null> {
        if (this.activeConfig) {
            return of(this.activeConfig);
        }
        return this.http.get<Config[]>(this.configUrl).pipe(
            map(configs => {
                this.activeConfig = configs.find(config => config.Active === 'true') || null;
                return this.activeConfig;
            })
        );
    }
}
