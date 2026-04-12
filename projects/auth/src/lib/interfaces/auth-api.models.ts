/** Shared user shape returned by register/login payloads */
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  /** Present on register response; may be omitted on login */
  createdAt?: string;
}

/** --- login --- */
export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginResPayload {
  user: AuthUser;
  token: string;
}

export interface LoginRes {
  status: boolean;
  code: number;
  payload: LoginResPayload;
}

/** Shape returned by `AuthAdaptor` after login (narrowed from `LoginRes`). */
export interface LoginAdapted {
  status: boolean;
  code: number;
  token: string;
  email: string;
}

/** --- register --- */
export interface RegisterReq {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phone: string;
}

export interface RegisterRes {
  status: boolean;
  code: number;
  payload: {
    user: AuthUser;
    token: string;
  };
}

/** --- forgot password --- */
export interface ForgotPasswordReq {
  email: string;
}

export interface ForgotPasswordRes {
  status: boolean;
  code: number;
  message: string;
}

/** --- reset password --- */
export interface ResetPasswordReq {
  confirmPassword: string;
  newPassword: string;
  token: string;
}

export interface ResetPasswordRes {
  status: boolean;
  code: number;
  message: string;
}

/** --- send email verification --- */
export interface SendEmailVerificationReq {
  email: string;
}

export interface SendEmailVerificationRes {
  status: boolean;
  code: number;
  message: string;
}

/** --- confirm email verification --- */
export interface ConfirmEmailVerificationReq {
  code: string;
  email: string;
}

export interface ConfirmEmailVerificationRes {
  status: boolean;
  code: number;
  message: string;
}
