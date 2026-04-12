import { inject, Injectable } from '@angular/core';
import { AuthMethods } from './base/AuthMethods';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { HttpClient } from '@angular/common/http';
import { AuthAdaptor } from './adaptor/auth-adaptor';
import type {
  ConfirmEmailVerificationRes,
  ForgotPasswordRes,
  LoginAdapted,
  LoginRes,
  RegisterReq,
  RegisterRes,
  ResetPasswordRes,
  SendEmailVerificationRes,
} from './interfaces/auth-api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthMethods {
  private readonly http = inject(HttpClient);
  private readonly authAdaptor = inject(AuthAdaptor);

  login(username: string, password: string): Observable<LoginAdapted> {
    return this.http
      .post<LoginRes>(AuthEndPoints.LOGIN, { username, password })
      .pipe(
        map((res) => {
          if (res?.status !== true) {
            throw res
          }
          return this.authAdaptor.adapt(res)
        }
        )
      );
  }

  register(data: RegisterReq): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(AuthEndPoints.REGISTER, data).pipe(
      map((res) => {
        if (res?.status !== true) {
          throw res
        }
        return res
      }
      ),
    );
  }

  forgotPassword(email: string): Observable<ForgotPasswordRes> {  
    return this.http.post<ForgotPasswordRes>(AuthEndPoints.FORGET_PASSWORD, { email }).pipe(
      map((res) => {
        if (res?.status !== true) {
          throw res
        }
        return res
      }
      ),
    );
  }

  resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<ResetPasswordRes> {
    return this.http.post<ResetPasswordRes>(AuthEndPoints.RESET_PASSWORD, {
      token,
      newPassword,
      confirmPassword,
    }).pipe(
      map((res) => {
        if (res?.status !== true) {
          throw res
        }
        return res
      }
      ),
    );
  }

  sendEmailVerification(email: string): Observable<SendEmailVerificationRes> {
    return this.http.post<SendEmailVerificationRes>(
      AuthEndPoints.SEND_EMAIL_VERIFICATION,
      { email }
    ).pipe(
      map((res) => {
        if (res?.status !== true) {
          throw res
        }
        return res
      }
      ),
    );
  }

  confirmEmailVerification(
    email: string,
    code: string
  ): Observable<ConfirmEmailVerificationRes> {
    return this.http.post<ConfirmEmailVerificationRes>(
      AuthEndPoints.CONFIRM_EMAIL_VERIFICATION,
      { email, code }
    ).pipe(
      map((res) => {
        if (res?.status !== true) {
          throw res
        }
        return res
      }
      ),
    );
  }
}
