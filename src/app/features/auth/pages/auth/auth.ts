import { Component } from '@angular/core';
import { AuthInfo } from "../../components/auth-info/auth-info";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [AuthInfo, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
