import { Injectable } from '@angular/core';
import {
  getFirestore, collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter,
  CollectionReference, 
  addDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseService } from './firebaseService';
import { ProfileService } from './profileService';

export interface ScenarioResponse {
  id: string;
  uid: string;
  scenarioId: string;
  response: string;
}

/**
* Firestore data converter for Video objects.
*/
const responseConverter: FirestoreDataConverter<ScenarioResponse> = {

  toFirestore(response: ScenarioResponse): DocumentData {
    const firebaseResponse: any = response;
    delete firebaseResponse.id; // ID is stored in document ID, not in data
    return firebaseResponse
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ScenarioResponse {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      uid: data['uid'],
      scenarioId: data['scenarioId'],
      response: data['response'],
    } as ScenarioResponse;
  }
};

/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ResponseService {

  private get responsesRef(): CollectionReference<ScenarioResponse> {
    const db = getFirestore(this.firebaseService.firebaseApp);
    return collection(db, "responses").withConverter(responseConverter);
  }

  constructor(
    private firebaseService: FirebaseService,
    private profileService: ProfileService
  ) {
    // Initialize Firebase
    const analytics = getAnalytics(this.firebaseService.firebaseApp);
  }

  public async addResponse(scenarioId: string, response: string): Promise<void> {
    console.log(this.profileService.getUid() )
    await addDoc(this.responsesRef, { 
      scenarioId,
      response,
      uid: this.profileService.getUid() || '',
      id: ''
    });
  }

}