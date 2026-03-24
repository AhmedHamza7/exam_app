import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/auth/auth').then((m) => m.Auth),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/components/login/login').then((m) => m.Login),
      },
      {
        path: 'create-account',
        loadComponent: () =>
          import('./features/components/create-account/create-account').then(
            (m) => m.CreateAccount,
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./features/components/forget-password/forget-password').then(
            (m) => m.ForgetPassword,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
