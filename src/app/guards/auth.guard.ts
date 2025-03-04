import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../stores/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  return authStore.isAuthenticated();
};
