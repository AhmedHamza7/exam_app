import { Routes } from '@angular/router';
import { authPagesGuard } from '../../../core/guards/auth-pages.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../../features/auth/pages/auth/auth').then((m) => m.Auth),
    canActivateChild: [authPagesGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../../../features/auth/components/login/login').then((m) => m.Login),
      },
      {
        path: 'create-account',
        loadComponent: () =>
          import('../../../features/auth/components/create-account/create-account').then(
            (m) => m.CreateAccount,
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('../../../features/auth/components/forget-password/forget-password').then(
            (m) => m.ForgetPassword,
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../../../features/auth/components/forget-password/components/reset-password/reset-password').then(
            (m) => m.ResetPassword,
          ),
      },
    ],
  }
];