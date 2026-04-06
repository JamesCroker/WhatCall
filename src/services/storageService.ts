import { Injectable } from '@angular/core';
import { getDownloadURL, ref, StorageReference, uploadBytes, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
    private storage: Storage
  ) {
  }

  public async upload(uid: string, scenarioId: string, file: File): Promise<string> {
    const storageRef = this.storageRef(uid, scenarioId);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  private storageRef(uid: string, scenarioId: string): StorageReference {
    return ref(this.storage, `uploads/${uid}/${scenarioId}`);
  }

}