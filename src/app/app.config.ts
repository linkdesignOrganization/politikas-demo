import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CrmTrackingService } from './services/crm-tracking.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const tracking = inject(CrmTrackingService);
        return () => tracking.init();
      }
    }
  ]
};
