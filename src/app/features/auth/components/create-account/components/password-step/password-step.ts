import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthStore } from '../../../../store/auth.store';
import { AuthService } from '../../../../../../../../dist/auth';
import {
  passwordRulesValidator,
  passwordsMatchValidator,
} from '../../../../validators/password.validators';

@Component({
  selector: 'app-password-step',
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule, MessageModule],
  templateUrl: './password-step.html',
  styleUrl: './password-step.scss',
})
export class PasswordStep {
  private readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  validationFailed = signal(false);
  errorMessage = signal('');
  loading = signal(false);

  readonly passwordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, passwordRulesValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordsMatchValidator] },
  );

  onSubmit(): void {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) return;

    const { password, confirmPassword } = this.passwordForm.getRawValue();
    const payload = {
      username: this.authStore.username(),
      email: this.authStore.email(),
      password: password ?? '',
      confirmPassword: confirmPassword ?? '',
      firstName: this.authStore.firstName(),
      lastName: this.authStore.lastName(),
      phone: this.authStore.phone(),
    };

    this.loading.set(true);
    this.validationFailed.set(false);
    this.errorMessage.set('');

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.status !== true) {
          this.validationFailed.set(true);
          this.errorMessage.set(res?.errors?.[0]?.message ?? 'Registration failed.');
          return;
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.validationFailed.set(true);
        this.errorMessage.set(
          err?.error?.errors?.[0]?.message ??
          err?.error?.message ??
          'Something went wrong.');
      },
    });
  }
}
