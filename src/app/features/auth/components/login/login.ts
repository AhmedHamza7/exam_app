import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../dist/auth';
import { MessageModule } from 'primeng/message';

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

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onLogin(): void {
    this.loading.set(true);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.status !== 200) {
          this.validationFailed.set(true);
          this.errorMessage.set(res?.errors?.[0]?.message);
          return;
        }
      
        this.successMessage.set(res.message);
      },
      error:(err)=> {
        console.log(err);
        
        this.loading.set(false);
        this.validationFailed.set(true);
        this.errorMessage.set(err.error?.errors?.[0]?.message);
      },
    })
  }
}
