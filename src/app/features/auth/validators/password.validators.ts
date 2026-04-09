import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordRulesValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value as string) ?? '';
  if (!v) return null;
  if (v.length < 8) {
    return { passwordRules: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(v)) {
    return { passwordRules: 'Password must include at least one uppercase letter' };
  }
  if (!/[0-9]/.test(v)) {
    return { passwordRules: 'Password must include at least one number' };
  }
  if (!/[^A-Za-z0-9]/.test(v)) {
    return { passwordRules: 'Password must include at least one special character' };
  }
  return null;
}

export const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const fg = group as FormGroup;
  const p = fg.get('password')?.value as string;
  const c = fg.get('confirmPassword')?.value as string;
  if (!p || !c) return null;
  return p === c ? null : { mismatch: true };
};
