import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (typeof window === 'undefined') return true;

  while (!auth.ready()) {
    await new Promise(r => setTimeout(r, 10));
  }
  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/admin/login']);
};
