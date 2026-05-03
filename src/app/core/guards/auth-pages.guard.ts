import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

function safeReturnUrl(raw: unknown): string | null {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) {
    return null;
  }
  return raw;
}

export const authPagesGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const token = userData?.token ?? null;

  if (token) {
    const parsed = router.parseUrl(router.url);
    const returnUrl = safeReturnUrl(parsed.queryParams['returnUrl']);
    if (returnUrl) {
      return router.parseUrl(returnUrl);
    }
    return router.createUrlTree(['/diplomas']);
  }

  return true;
};
