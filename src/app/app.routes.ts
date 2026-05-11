import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'artist/:slug',
    loadComponent: () => import('./pages/artist-detail/artist-detail').then(m => m.ArtistDetail),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login').then(m => m.AdminLogin),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.AdminDashboard),
  },
  {
    path: 'admin/artist/:slug',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/artist-edit/artist-edit').then(m => m.AdminArtistEdit),
  },
  {
    path: 'admin/picks/:kind',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/picks-edit/picks-edit').then(m => m.AdminPicksEdit),
  },
  { path: '**', redirectTo: '' },
];
