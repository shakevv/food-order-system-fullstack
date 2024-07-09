import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../service/user-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userStorageService = inject(UserStorageService);
  const router = inject(Router);

  return userStorageService.isLoggedIn() || router.createUrlTree(['/login']);
};
