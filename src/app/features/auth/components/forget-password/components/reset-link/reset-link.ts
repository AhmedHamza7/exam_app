import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-link',
  imports: [RouterModule, ButtonModule],
  templateUrl: './reset-link.html',
  styleUrl: './reset-link.scss',
})
export class ResetLink {
  @Input() email = '';

  @Output() back = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();

  onBack(): void {
    this.back.emit();
  }

}
