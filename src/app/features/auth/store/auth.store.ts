import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  email = signal<string>('');
  firstName = signal<string>('');
  lastName = signal<string>('');
  username = signal<string>('');
  phone = signal<string>('');
}
