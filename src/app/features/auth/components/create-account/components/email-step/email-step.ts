import { Component, inject, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStore } from '../../../../store/auth.store';
import { AuthService } from '../../../../../../../../dist/auth';
import { MessageModule } from 'primeng/message';
import { signal } from '@angular/core';
@Component({
  selector: 'app-email-step',
  imports: [RouterModule, InputTextModule,MessageModule, ButtonModule, FormsModule],
  templateUrl: './email-step.html',
  styleUrl: './email-step.scss',
})
export class EmailStep {
  private readonly authStore = inject(AuthStore);
  readonly email = model(this.authStore.email());
  private readonly authService = inject(AuthService);

  validationFailed = signal(false);
  errorMessage = signal('');
  loading = signal(false);
  @Input() activateCallback?: (value: number) => void;

  onNext(): void {
    this.loading.set(true);
    this.authService.sendEmailVerification(this.email()).subscribe({
      next: (res) => {
        this.authStore.email.set(this.email());
        this.activateCallback?.(2);
        this.loading.set(false);
      },
      error: (err) => {
        this.validationFailed.set(true);
        this.errorMessage.set(err?.error?.errors?.[0]?.message ??
          err?.error?.message ?? 'Failed to verify email.');
        this.loading.set(false);
      },
    });
  }
}
