import { Observable } from "rxjs";
import type {
  ConfirmEmailVerificationRes,
  ForgotPasswordRes,
  LoginAdapted,
  RegisterReq,
  RegisterRes,
  ResetPasswordRes,
  SendEmailVerificationRes,
} from "../interfaces/auth-api.models";

export abstract class AuthMethods {
  abstract login(username: string, password: string): Observable<LoginAdapted>;
  abstract register(data: RegisterReq): Observable<RegisterRes>;
  abstract forgotPassword(email: string): Observable<ForgotPasswordRes>;
  abstract resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<ResetPasswordRes>;
  abstract sendEmailVerification(email: string): Observable<SendEmailVerificationRes>;
  abstract confirmEmailVerification(
    email: string,
    code: string
  ): Observable<ConfirmEmailVerificationRes>;
}