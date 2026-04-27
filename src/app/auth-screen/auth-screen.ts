import { OAuthScreenComponent, GoogleSignInButtonComponent } from "@firebase-oss/ui-angular";
import { Component, OnInit } from '@angular/core';
import { Auth, User, onAuthStateChanged } from "@angular/fire/auth";
import { MatButtonModule } from "@angular/material/button";

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

  ngOnInit(): void {
    console.debug('AuthScreenComponent initialized');
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.debug('User signed in:', user);
      } else {
        console.debug('User signed out');
      }
    });
  }

  onSignIn(user: User): void {
    console.debug('Sign-in button clicked', user);
    // The actual sign-in logic is handled by the Firebase UI component, so we don't need to do anything here.
  }

  signOut(): void {
    this.auth.signOut()
      .then(() => {
        console.debug('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }

  display(): void {
    console.debug('Current user:', this.auth.currentUser);  // TODO: Replace with actual user info from auth state 
  }
}