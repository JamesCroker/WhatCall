import { Injectable } from '@angular/core';
import { FirebaseService } from './firebaseService';
import { getDownloadURL, getStorage, ref, StorageReference, uploadBytes } from "firebase/storage";

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
    private firebaseService: FirebaseService
  ) {
  }

  public async upload(uid: string, scenarioId: string, file: File): Promise<string> {
    const storageRef = this.storageRef(uid, scenarioId);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  private storageRef(uid: string, scenarioId: string): StorageReference {
    const storage = getStorage(this.firebaseService.firebaseApp);
    return ref(storage, `uploads/${uid}/${scenarioId}`);
  }

}