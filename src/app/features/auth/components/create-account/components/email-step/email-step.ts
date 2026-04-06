import { Component, inject, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStore } from '../../../../store/auth.store';
import { AuthService } from '../../../../../../../../dist/auth';
import { MessageModule } from 'primeng/message';

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

  validationFailed = false;
  errorMessage = ''
  loading = false;
  @Input() activateCallback?: (value: number) => void;

  onNext(): void {
    this.loading = true;
    this.authService.sendEmailVerification(this.email()).subscribe({
      next: (res) => {
        if (res.code !== 200) {
          this.validationFailed = true;
          this.errorMessage = res.errors[0].message;
          this.loading = false;
          return;
        }
        this.authStore.email.set(this.email());
        this.activateCallback?.(2);
        this.loading = false;
      },
      error: (err) => {
        this.validationFailed = true;
        this.errorMessage = err.error.errors[0].message;
        this.loading = false;
      },
    });
  }
}
