import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { API_URL } from './core/configs/api.token';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor'



registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask(),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor, loadingInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: API_URL, useValue: environment.apiUrl },
    provideAnimations(), 
    provideToastr({      
      timeOut: 3000,
      closeButton: true,
      easing: 'ease-in',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }))
  ],
};
