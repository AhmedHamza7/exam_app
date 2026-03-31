import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-otp-step',
  imports: [InputOtpModule, FormsModule, ButtonModule],
  templateUrl: './otp-step.html',
  styleUrl: './otp-step.scss',
})
export class OtpStep implements OnInit, OnDestroy {
  readonly email = input('');

  @Input() activateCallback?: (value: number) => void;

  value: string | undefined;

  countdownSeconds = 60;

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      }
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
    this.activateCallback?.(3);
  }
}
