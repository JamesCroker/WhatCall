import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, StorageReference, uploadBytes, Storage } from '@angular/fire/storage';

/**
 * Handles all interaction with the Firebase storage service.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {

  /** Reference the Angular/Fire storage serive */
  private storage: Storage

  constructor(
  ) {
    this.storage = this.getFirebaseStorage();
  }

  /**
   * Uploads a document to firebase storage and create a public URL
   *
   * @param uid ID of current user
   * @param scenarioId ScenarioId to attach document to.
   * @param file File to upload
   * @returns Resolves to a promise with the publicly accessible URL of the file
   */
  public async upload(uid: string, scenarioId: string, file: File): Promise<string> {
    const storageRef = this.storageRef(uid, scenarioId);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  /**
   * Returns a storage refence to the file location, for a uid/scenarioId combination
   *
   * @param uid User Id
   * @param fileId Id (or name) of the file
   * @returns firestore storage reference
   */
  private storageRef(uid: string, fileId: string): StorageReference {
    return ref(this.storage, `uploads/${uid}/${fileId}`);
  }

  /**
   * gets injected Firebase Storage service
   *
   * @returns Firebase Storage service
   */
  public getFirebaseStorage(): Storage {
    return inject(Storage);
  }
}
