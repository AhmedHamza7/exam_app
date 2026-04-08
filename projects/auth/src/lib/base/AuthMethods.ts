import { Observable } from "rxjs";

export abstract class AuthMethods {
    abstract login(username: string, password: string): Observable<any>;
    abstract register(data:any): Observable<any>;
    abstract forgotPassword(email: string): Observable<any>;
    abstract resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any>;
    abstract sendEmailVerification(email: string): Observable<any>;
    abstract confirmEmailVerification(email: string, code: string): Observable<any>;
}