import { Component, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-email-step',
  imports: [RouterModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './email-step.html',
  styleUrl: './email-step.scss',
})
export class EmailStep {
  readonly email = model('');

  // PrimeNG provides this function via the p-step-panel content template.
  @Input() activateCallback?: (value: number) => void;

  onNext(): void {
    this.activateCallback?.(2);
  }
}
