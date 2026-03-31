import { Component, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-info-step',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './user-info-step.html',
  styleUrl: './user-info-step.scss',
})
export class UserInfoStep {
  readonly firstName = model('');
  readonly lastName = model('');
  readonly username = model('');
  readonly phone = model('');

  // PrimeNG provides this function via the p-step-panel content template.
  @Input() activateCallback?: (value: number) => void;

  onNext(): void {
    this.activateCallback?.(4);
  }
}
