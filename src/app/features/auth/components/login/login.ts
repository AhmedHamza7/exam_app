import { Component, inject } from '@angular/core';
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
  validationFailed = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  private readonly authService = inject(AuthService);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onLogin(): void {
    this.loading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.status !== 200) {
          this.validationFailed = true;
          this.errorMessage = res.message;
          return;
        }
      
        this.successMessage = res.message;
      },
      error:(err)=> {
        console.log(err);
        
        this.loading = false;
        this.validationFailed = true;
        this.errorMessage = err.error.message;
      },
    })
  }
}
