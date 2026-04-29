import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';

export const diplomasRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard], // 👈 هنا
    loadComponent: ()=> import('../pages/diplomas/diplomas').then((m)=> m.Diplomas)
  }
];