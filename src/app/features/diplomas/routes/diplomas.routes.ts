import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';

export const diplomasRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../pages/diplomas/diplomas').then((m) => m.Diplomas),
  },
  // More specific path first so `exams/questions/:id` is not captured by `exams/:id`.
  {
    path: 'exams/questions/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../pages/exam-questions/exam-questions').then((m) => m.ExamQuestions),
  },
  {
    path: 'exams/:id',
    canActivate: [authGuard],
    loadComponent: () => import('../pages/exams/exams').then((m) => m.Exams),
  },
];