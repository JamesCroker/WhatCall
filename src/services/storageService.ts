import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getDownloadURL, ref, StorageReference, uploadBytes, Storage, getStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage
  
  constructor(
  ) {
    this.storage = this.getFirebaseStorage();
  }

  public async upload(uid: string, scenarioId: string, file: File): Promise<string> {
    const storageRef = this.storageRef(uid, scenarioId);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  private storageRef(uid: string, scenarioId: string): StorageReference {
    return ref(this.storage, `uploads/${uid}/${scenarioId}`);
  }

  public getFirebaseStorage() {
    return getStorage(inject(FirebaseApp));
  }
}