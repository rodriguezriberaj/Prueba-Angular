import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/ui/components/layout/layout.component';

export const routes: Routes = [
    {
      component: LayoutComponent,
      path: '',
      title: 'Inicio',
      children: [
        {
          loadComponent: async () => (await import('./modules/product/components/product-list/product-list.component')).ProductListComponent,
          path: '',
          pathMatch: 'full',
        },
        {
          loadComponent: async () => (await import('./modules/product/components/product-create/product-create.component')).ProductCreateComponent,
          path: 'create',
          pathMatch: 'full',
        }
      ],
    },
  ];
