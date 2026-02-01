import { Injectable } from '@angular/core';
import { Profile } from '../types/profile';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { FirebaseService } from './firebaseService';

@Injectable({
  providedIn: 'root',
})
export class ProfileService  {

  private uid: string | null = null;
  
  constructor(
    private firebaseService: FirebaseService
  ) {
    const auth = getAuth(this.firebaseService.firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.debug('User signed in:', user);
        this.uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        console.debug('User signed out');
        this.uid = null;
      }
    });
  }

  getProfile(): Profile {
    return {
      name: 'John Doe'
    }
  }

  getUid(): string | null {
    return this.uid;
  }

  updateProfile(profile: Profile): void {
    console.log('Profile updated:', profile);
  }

  async login(): Promise<void> {
    const auth = getAuth(this.firebaseService.firebaseApp);
    try {
      const x = await signInAnonymously(auth);
      console.log('User signed in anonymously', x);
    }
    catch (error) {
      console.error('Error during anonymous sign-in:', error);
    }
  }

}
