import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import type { LoginAdapted, LoginRes } from '../interfaces/auth-api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor implements Adaptor {
  adapt(data: LoginRes): LoginAdapted {
    return {
      status: data.status,
      code: data.code,
      token: data.payload.token,
      email: data.payload.user.email,
    };
  }
}
