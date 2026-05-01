import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  breadcrumbData = signal<{ label: string; routerLink?: string }[]>([]);

  headerBacklink = signal<string | undefined>(undefined);
  headerTitle = signal<string>('');
  headerIcon = signal<string>('pi pi-file');
}
