import { NgIf } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../../../../features/auth/store/auth.store';

@Component({
  selector: 'app-main-layout-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './main-layout-sidebar.html',
  styleUrl: './main-layout-sidebar.scss',
})
export class MainLayoutSidebar {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  showMenu = signal(false);

  constructor() {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    if (userData?.token) {
      this.authStore.setUserData(userData);
    }
  }

  get firstName(): string {
    return this.authStore.firstName() || 'User';
  }

  get email(): string {
    return this.authStore.email() || '';
  }

  get profilePhoto(): string {
    return this.authStore.profilePhoto() || '/images/avatar.png';
  }

  get isAdmin(): boolean {
    return this.authStore.role() === 'ADMIN';
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.showMenu.update((value) => !value);
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.showMenu.set(false);
  }

  onLogout(): void {
    localStorage.removeItem('userData');
    this.authStore.clearUserData();
    this.router.navigate(['/auth/login']);
  }
}
