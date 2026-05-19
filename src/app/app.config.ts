import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LucideAngularModule, icons } from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(LucideAngularModule.pick(icons)),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          const redirect = sessionStorage.getItem('redirect');
          if (redirect) {
            sessionStorage.removeItem('redirect');
            window.location.href = redirect;
          }
        };
      },
      multi: true
    }
  ]
};
