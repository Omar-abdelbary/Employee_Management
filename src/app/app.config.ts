import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinner } from 'ngx-spinner';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withInMemoryScrolling() , ), provideClientHydration() ,
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor , errorsInterceptor , loadingInterceptor])) ,
    provideAnimations() ,
    provideToastr() ,
    importProvidersFrom(NgxSpinner)

  ]
};
