import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  newPassword = '';
  confirmNewPassword = '';
  
  constructor(
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);
    
  }

  onResetPassword(): void {
    // Wire to API when available
  }
}
