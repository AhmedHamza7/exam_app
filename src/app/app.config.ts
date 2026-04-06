import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

const themePreset = definePreset(Aura, {
  semantic: {
            primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '#155DFC',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
      colorScheme: {
        light: {
          primary: {
              color: '{zinc.950}',
              inverseColor: '#ffffff',
              hoverColor: '{zinc.900}',
              activeColor: '{zinc.800}'
          },
          highlight: {
              background: '{zinc.950}',
              focusBackground: '{zinc.700}',
              color: '#ffffff',
              focusColor: '#ffffff'
          }
      },
      }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
          preset: themePreset
      }
    }),
    provideNoopAnimations(),
    provideHttpClient()
  ]
};
