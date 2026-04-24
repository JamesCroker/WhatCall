import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Use authState to check if a user is logged in
  return authState(auth).pipe(
    take(1), // Take the first value and complete
    map(user => {
      if (user) {
        return true; // User is authenticated, allow access
      } else {
        // User not logged in, redirect to your auth screen
        return router.parseUrl('/login'); 
      }
    })
  );
};
