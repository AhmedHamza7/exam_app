import { Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStore } from '../../../../store/auth.store';

function egyptianMobileValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value as string)?.trim() ?? '';
  if (!v) return null;
  const ok = /^01[0125][0-9]{8}$/.test(v);
  return ok ? null : { egyptianMobile: true };
}

@Component({
  selector: 'app-user-info-step',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './user-info-step.html',
  styleUrl: './user-info-step.scss',
})
export class UserInfoStep {
  private readonly authStore = inject(AuthStore);

  @Input() activateCallback?: (value: number) => void;

  readonly userForm = new FormGroup({
    firstName: new FormControl(this.authStore.firstName(), [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(this.authStore.lastName(), [
      Validators.required,
      Validators.minLength(2),
    ]),
    username: new FormControl(this.authStore.username(), [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl(this.authStore.phone(), [
      Validators.required,
      egyptianMobileValidator,
    ]),
  });

  onNext(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const { firstName, lastName, username, phone } = this.userForm.getRawValue();
    this.authStore.firstName.set((firstName ?? '').trim());
    this.authStore.lastName.set((lastName ?? '').trim());
    this.authStore.username.set((username ?? '').trim());
    this.authStore.phone.set((phone ?? '').trim());

    this.activateCallback?.(4);
  }
}
