const BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api'

export class AuthEndPoints {
    static readonly LOGIN = `${BASE_URL}/auth/login`;
    static readonly REGISTER = `${BASE_URL}/auth/login`;
    static readonly FORGET_PASSWORD = `${BASE_URL}/auth/forgot-password`;
    static readonly SEND_EMAIL_VERIFICATION = `${BASE_URL}/auth/send-email-verification`;
    static readonly CONFIRM_EMAIL_VERIFICATION = `${BASE_URL}/auth/confirm-email-verification`;
    static readonly RESET_PASSWORD = `${BASE_URL}/auth/reset-password`;
}