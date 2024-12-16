import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { apiUrlInterceptor } from './shared/interceptors/api-url.interceptor';
import { apiErrorInterceptor } from './shared/interceptors/api-error.interceptor';
import { ProductMapper } from './modules/product/mappers/product-mapper';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules),),
    provideHttpClient(withInterceptors([
      apiUrlInterceptor,
      apiErrorInterceptor
    ])),
    ProductMapper]
};
