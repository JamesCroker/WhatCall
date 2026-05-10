import { OAuthScreenComponent, GoogleSignInButtonComponent } from "@firebase-oss/ui-angular";
import { Component, inject, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from "@angular/fire/auth";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";

/**
 * Uses FirebaseUI to display an Signin with Google sign-in screen.
 *
 * The signin flow is hanlded via Google OAuth using popups.
 */
@Component({
  selector: 'app-auth-screen',
  imports: [MatButtonModule, OAuthScreenComponent, GoogleSignInButtonComponent],
  templateUrl: './auth-screen.html',
  styleUrl: './auth-screen.scss',
})
export class AuthScreenComponent implements OnInit {

  constructor(
    /** injected Auth service */
    private auth: Auth
  ) {
    // Empty constructor
  }

  /** Reference to the modal dialog */
  private readonly dialogRef = inject(MatDialogRef<AuthScreenComponent>);

  ngOnInit(): void {
    // Subscrive to changes in user state, and log to console for debug.
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.debug('User signed in:', user.displayName);
      } else {
        console.debug('User signed out');
      }
    });
  }

  /**
   * onSignIn event handler.
   *
   * Close the dialog once the user signs in
   */
  onSignIn(): void {
    this.dialogRef.close();
  }

}
