import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthStore } from '../../../../store/auth.store';
import { AuthService } from '../../../../../../../../dist/auth';

@Component({
  selector: 'app-otp-step',
  imports: [InputOtpModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './otp-step.html',
  styleUrl: './otp-step.scss',
})
export class OtpStep implements OnInit, OnDestroy {
  private readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);

  @Input() activateCallback?: (value: number) => void;

  readonly email = this.authStore.email;

  value: string | undefined;

  readonly countdownSeconds = signal(60);

  validationFailed = signal(false);
  errorMessage = signal('');
  loading = signal(false);
  resendLoading = signal(false);

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.countdownSeconds.update((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  onEdit(): void {
    this.activateCallback?.(1);
  }

  onVerify(): void {
    const code = (this.value ?? '').trim();
    const email = this.authStore.email();
    if (!email || code.length !== 6) {
      this.validationFailed.set(true);
      this.errorMessage.set('Please enter the 6-digit code.');
      return;
    }

    this.loading.set(true);
    this.validationFailed.set(false);
    this.errorMessage.set('');

    this.authService.confirmEmailVerification(email, code).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.code !== 200) {
          this.validationFailed.set(true);
          this.errorMessage = res?.errors?.[0]?.message ?? 'Verification failed.';
          return;
        }
        this.activateCallback?.(3);
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

  onResend(): void {
    if (this.countdownSeconds() > 0) return;
    const email = this.authStore.email();
    if (!email) return;

    this.resendLoading.set(true);
    this.validationFailed.set(false);
    this.errorMessage.set('');

    this.authService.sendEmailVerification(email).subscribe({
      next: (res) => {
        this.resendLoading.set(false);
        if (res?.code !== 200) {
          this.validationFailed.set(true);
          this.errorMessage.set(res?.errors?.[0]?.message ?? 'Could not resend code.');
          return;
        }
        this.countdownSeconds.set(60);
      },
      error: (err) => {
        this.resendLoading.set(false);
        this.validationFailed.set(true);
        this.errorMessage.set(
          err?.error?.errors?.[0]?.message ??
          err?.error?.message ??
          'Something went wrong.');
      },
    });
  }
}
