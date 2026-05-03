import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';

export const diplomasRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard], 
    loadComponent: ()=> import('../pages/diplomas/diplomas').then((m)=> m.Diplomas)
  },
  {
    path: 'exams/:id',
    canActivate: [authGuard], 
    loadComponent: ()=> import('../pages/exams/exams').then((m)=> m.Exams)
  }
];