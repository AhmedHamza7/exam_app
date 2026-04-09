import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../../../../../../dist/auth';
import {
  passwordRulesValidator,
  passwordsMatchValidator,
} from '../../../../validators/password.validators';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly resetPasswordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, passwordRulesValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordsMatchValidator] },
  );

  token = '';
  loading = signal(false);
  validationFailed = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }

  onResetPassword(): void {
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.invalid) {
      return;
    }

    if (!this.token) {
      this.validationFailed.set(true);
      this.errorMessage.set('Invalid reset link.');
      return;
    }

    const { password, confirmPassword } = this.resetPasswordForm.getRawValue();

    this.loading.set(true);
    this.validationFailed.set(false);
    this.errorMessage.set('');

    this.authService.resetPassword(this.token, password ?? '', confirmPassword ?? '')
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res?.status !== true) {
            this.validationFailed.set(true);
            this.errorMessage.set(res?.errors?.[0]?.message ?? res?.message ?? 'Failed to reset password.');
            return;
          }
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading.set(false);
          this.validationFailed.set(true);
          this.errorMessage.set(
            err?.error?.errors?.[0]?.message ?? err?.error?.message ?? 'Something went wrong.',
          );
        },
      });
  }
}
