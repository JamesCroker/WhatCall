import { Injectable } from '@angular/core';
import { Profile } from '../types/profile';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private auth: Auth
  ) {
    // Do nothing
  }

  getUid(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : 'default-uid';  // TODO: Handle unauthenticated state properly
  }

  updateProfile(profile: Profile): void {
    console.log('Profile updated:', profile);
  }

}
