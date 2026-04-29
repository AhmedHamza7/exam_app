import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private route = inject(Router);
  breadcrumbData = signal<{label:string, routerLink?:string}[]>([]) 
  
  
}
