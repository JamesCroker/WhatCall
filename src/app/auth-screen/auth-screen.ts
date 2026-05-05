import { OAuthScreenComponent, GoogleSignInButtonComponent } from "@firebase-oss/ui-angular";
import { Component, inject, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from "@angular/fire/auth";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-auth-screen',
  imports: [MatButtonModule, OAuthScreenComponent, GoogleSignInButtonComponent],
  templateUrl: './auth-screen.html',
  styleUrl: './auth-screen.scss',
})
export class AuthScreenComponent implements OnInit {

  constructor(
    private auth: Auth
  ) { }

  private readonly dialogRef = inject(MatDialogRef<AuthScreenComponent>);

  ngOnInit(): void {
    console.debug('AuthScreenComponent initialized');
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.debug('User signed in:', user.displayName);
      } else {
        console.debug('User signed out');
      }
    });
  }

  onSignIn(): void {
    this.dialogRef.close();
  }

}
