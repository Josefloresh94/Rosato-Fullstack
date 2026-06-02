import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard'),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders'),
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports'),
  },
];
