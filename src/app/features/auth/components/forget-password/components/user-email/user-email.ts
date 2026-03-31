import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-email',
  imports: [FormsModule, RouterModule, InputTextModule, ButtonModule],
  templateUrl: './user-email.html',
  styleUrl: './user-email.scss',
})
export class UserEmail {
  email = '';

  @Output() next = new EventEmitter<string>();

  onNext(): void {
    this.next.emit(this.email);
  }
}
