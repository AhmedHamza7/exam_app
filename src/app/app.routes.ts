import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/routes/auth.routes';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { diplomasRoutes } from './features/diplomas/routes/diplomas.routes';
import { authGuard } from './core/guards/auth.guard';
import { authPagesGuard } from './core/guards/auth-pages.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
    {
      path:'',
      component: MainLayout,
      children: [
        {
          path: 'diplomas',
          children: diplomasRoutes
        },
        {
          path:'',
          redirectTo: 'diplomas',
          pathMatch: 'full'
        },
      ]
    }
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // },
];
