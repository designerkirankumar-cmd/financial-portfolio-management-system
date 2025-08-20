import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient, withFetch,  withNoXsrfProtection } from '@angular/common/http';
import { appConfig } from './app.config';
import { provideServerRouting } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withNoXsrfProtection(),
    ),
    provideServerRendering(),
    provideServerRouting(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);