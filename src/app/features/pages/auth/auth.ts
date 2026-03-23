import { Component } from '@angular/core';
import { AuthInfo } from "../../components/auth-info/auth-info";
import { Login } from "../../components/login/login";
@Component({
  selector: 'app-auth',
  imports: [AuthInfo, Login],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
