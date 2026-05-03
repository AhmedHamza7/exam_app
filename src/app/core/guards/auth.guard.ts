import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/** Only allow same-app absolute paths (avoid open redirects). */
function safeReturnUrl(url: string): string | null {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return null;
  }
  return url;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // SSR / prerender: no localStorage — do not send users to login; browser re-runs this guard with the real token.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const token = userData?.token;

  if (token) {
    return true;
  }

  const returnUrl = safeReturnUrl(router.url);
  return router.createUrlTree(['/auth/login'], {
    queryParams: returnUrl ? { returnUrl } : undefined,
  });
};