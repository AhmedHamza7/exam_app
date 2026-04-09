import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../../../../../../dist/auth';

@Component({
  selector: 'app-user-email',
  imports: [FormsModule, RouterModule, InputTextModule, ButtonModule, MessageModule],
  templateUrl: './user-email.html',
  styleUrl: './user-email.scss',
})
export class UserEmail {
  private readonly authService = inject(AuthService);

  email = '';
  loading = signal(false);
  validationFailed = signal(false);
  errorMessage = signal('');

  @Output() next = new EventEmitter<string>();

  onNext(): void {
    const email = this.email.trim();
    if (!email) {
      this.validationFailed.set(true);
      this.errorMessage.set('Email is required.');
      return;
    }

    this.loading.set(true);
    this.validationFailed.set(false);
    this.errorMessage.set('');

    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.status !== true) {
          this.validationFailed.set(true);
          this.errorMessage.set(res?.errors?.[0]?.message ?? res?.message ?? 'Failed to send reset link.');
          return;
        }
        this.next.emit(email);
      },
      error: (err) => {
        this.loading.set(false);
        this.validationFailed.set(true);
        this.errorMessage.set(
          err?.error?.errors?.[0]?.message ?? err?.error?.message ?? 'Something went wrong.');
      },
    });
  }
}
