import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, HostListener, inject, output, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../../../../features/auth/store/auth.store';

@Component({
  selector: 'app-main-layout-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './main-layout-sidebar.html',
  styleUrl: './main-layout-sidebar.scss',
})
export class MainLayoutSidebar {
  /** Emitted when the user follows primary navigation; parent closes mobile drawer. */
  navigate = output<void>();
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  platformId = inject(PLATFORM_ID);
  showMenu = signal(false);

  constructor() {
    let userDataString: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      userDataString = localStorage.getItem('userData');
    }
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

  onPrimaryNavClick(): void {
    this.navigate.emit();
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.showMenu.set(false);
  }

  onLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userData');
    }
    this.authStore.clearUserData();
    this.navigate.emit();
    this.router.navigate(['/auth/login']);
  }
}
