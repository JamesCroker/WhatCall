import { Injectable } from '@angular/core';
import { Profile } from '../types/profile';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private auth: Auth
  ) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.debug('User signed in:', user);
        // ...
      } else {
        // User is signed out
        // ...
        console.debug('User signed out');
      }
    });
  }

  getUid(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : 'default-uid';  // TODO: Handle unauthenticated state properly
  }

  updateProfile(profile: Profile): void {
    console.log('Profile updated:', profile);
  }

  /*
  async login(): Promise<void> {
    try {
      const x = await signInAnonymously(this.auth);
      console.log('User signed in anonymously', x);
    }
    catch (error) {
      console.error('Error during anonymous sign-in:', error);
    }
  }
  */

}