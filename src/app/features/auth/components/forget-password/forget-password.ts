import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserEmail } from './components/user-email/user-email';
import { ResetLink } from './components/reset-link/reset-link';
import { ResetPassword } from './components/reset-password/reset-password';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, UserEmail, ResetLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
  step: 'email' | 'resetLink'  = 'email';
  email = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }

  onEmailNext(enteredEmail: string): void {
    this.email = enteredEmail;
    this.step = 'resetLink';
  }

  onResetLinkBack(): void {
    this.step = 'email';
  }
}
