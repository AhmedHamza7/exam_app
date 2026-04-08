import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthStore } from '../../../../store/auth.store';
import { AuthService } from '../../../../../../../../dist/auth';

function passwordRulesValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value as string) ?? '';
  if (!v) return null;
  if (v.length < 8) {
    return { passwordRules: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(v)) {
    return { passwordRules: 'Password must include at least one uppercase letter' };
  }
  if (!/[0-9]/.test(v)) {
    return { passwordRules: 'Password must include at least one number' };
  }
  if (!/[^A-Za-z0-9]/.test(v)) {
    return { passwordRules: 'Password must include at least one special character' };
  }
  return null;
}

const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const fg = group as FormGroup;
  const p = fg.get('password')?.value as string;
  const c = fg.get('confirmPassword')?.value as string;
  if (!p || !c) return null;
  return p === c ? null : { mismatch: true };
};

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

  validationFailed = false;
  errorMessage = '';
  loading = false;

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

    this.loading = true;
    this.validationFailed = false;
    this.errorMessage = '';

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.status !== true) {
          this.validationFailed = true;
          this.errorMessage = res?.errors?.[0]?.message ?? 'Registration failed.';
          return;
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.validationFailed = true;
        this.errorMessage =
          err?.error?.errors?.[0]?.message ??
          err?.error?.message ??
          'Something went wrong.';
      },
    });
  }
}
