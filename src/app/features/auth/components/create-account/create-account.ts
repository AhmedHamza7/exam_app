import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { EmailStep } from './components/email-step/email-step';
import { OtpStep } from './components/otp-step/otp-step';
import { UserInfoStep } from './components/user-info-step/user-info-step';
import { PasswordStep } from './components/password-step/password-step';

@Component({
  selector: 'app-create-account',
  imports: [StepperModule, EmailStep, OtpStep, UserInfoStep, PasswordStep],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {}
