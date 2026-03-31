import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password-step',
  imports: [FormsModule, PasswordModule, ButtonModule],
  templateUrl: './password-step.html',
  styleUrl: './password-step.scss',
})
export class PasswordStep {
  password = '';
  confirmPassword = '';
}
