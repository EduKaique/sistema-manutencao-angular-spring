import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { API_URL } from './core/configs/api.token';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { environment } from '../environments/environment';
import { routes } from './app.routes';


registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask(),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: API_URL, useValue: environment.apiUrl }
  ],
};
