import { inject, Injectable } from '@angular/core';
import { AuthMethods } from './base/AuthMethods';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { HttpClient } from '@angular/common/http';
import { AuthAdaptor } from './adaptor/auth-adaptor';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthMethods{
  private readonly http = inject(HttpClient);
  private readonly authAdaptor = inject(AuthAdaptor);
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(AuthEndPoints.LOGIN, { username, password })
    .pipe(map(res => this.authAdaptor.adapt(res)), catchError(err => of(err)))
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(AuthEndPoints.REGISTER, { email, password });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(AuthEndPoints.FORGET_PASSWORD, { email });
  }

  resetPassword(token: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    return this.http.post(AuthEndPoints.RESET_PASSWORD, { token, newPassword, confirmNewPassword });
  }

  sendEmailVerification(email: string): Observable<any> {
    return this.http.post(AuthEndPoints.SEND_EMAIL_VERIFICATION, { email });
  }

  confirmEmailVerification(email: string, code: string): Observable<any> {
    return this.http.post(AuthEndPoints.CONFIRM_EMAIL_VERIFICATION, { email, code });
  }
}
