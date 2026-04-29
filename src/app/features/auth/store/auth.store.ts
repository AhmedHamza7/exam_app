import { Injectable, signal } from '@angular/core';

export interface AuthUserData {
  firstName: string;
  role: string;
  email: string;
  token: string;
  profilePhoto?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  email = signal<string>('');
  firstName = signal<string>('');
  lastName = signal<string>('');
  username = signal<string>('');
  phone = signal<string>('');
  role = signal<string>('');
  token = signal<string>('');
  profilePhoto = signal<string>('');

  setUserData(userData: AuthUserData): void {
    this.firstName.set(userData.firstName);
    this.role.set(userData.role);
    this.email.set(userData.email);
    this.token.set(userData.token);
    this.profilePhoto.set(userData.profilePhoto ?? '');
  }

  clearUserData(): void {
    this.firstName.set('');
    this.role.set('');
    this.email.set('');
    this.token.set('');
    this.profilePhoto.set('');
  }
}
