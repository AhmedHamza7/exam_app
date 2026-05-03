import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../dist/auth';
import { MessageModule } from 'primeng/message';
import { AuthStore } from '../../store/auth.store';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, InputTextModule, PasswordModule, ButtonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  validationFailed = signal(false);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  private readonly authService = inject(AuthService);
  private readonly authStore = inject(AuthStore);
  private readonly sharedService = inject(SharedService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  private postLoginTarget(): string {
    const fromQuery = this.route.snapshot.queryParamMap.get('returnUrl');
    if (
      typeof fromQuery === 'string' &&
      fromQuery.startsWith('/') &&
      !fromQuery.startsWith('//')
    ) {
      return fromQuery;
    }
    return '/diplomas';
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('hamza_exam', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('Hamza_1234', [Validators.required, Validators.minLength(6)]),
  })

  onLogin(): void {
    this.loading.set(true);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        const userData = {
          firstName: res.firstName,
          role: res.role,
          email: res.email,
          token: res.token,
          profilePhoto: res.profilePhoto ?? '',
        };
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
        this.authStore.setUserData(userData);
        void this.router.navigateByUrl(this.postLoginTarget());
      },
    
      error: (err) => {
        this.loading.set(false);
        this.validationFailed.set(true);
    
        this.errorMessage.set(
          err?.error?.errors?.[0]?.message ??
          err?.error?.message ??
          'Something went wrong.'
        );
      }
    })
  }
}
