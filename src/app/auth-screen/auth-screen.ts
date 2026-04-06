import { SignUpAuthScreenComponent, GoogleSignInButtonComponent } from "@firebase-oss/ui-angular";

import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-screen',
  imports: [SignUpAuthScreenComponent, GoogleSignInButtonComponent],
  templateUrl: './auth-screen.html',
  styleUrl: './auth-screen.scss',
})
export class AuthScreenComponent {

}