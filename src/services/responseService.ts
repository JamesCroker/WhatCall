import { Injectable } from '@angular/core';
import {
  getFirestore, collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter,
  CollectionReference,
  addDoc,
  query,
  where,
  doc,
  getDocs,
  limit
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
    console.log(this.profileService.getUid())
    await addDoc(this.responsesRef, {
      scenarioId,
      response,
      uid: this.profileService.getUid() || '',
      id: ''
    });
  }

  public async getResponsesForScenario(scenarioId: string): Promise<ScenarioResponse[]> {
    const q = query(this.responsesRef, where("scenarioId", "==", scenarioId));
    const d = await getDocs(q);
    return d.docs.map(doc => doc.data());
  }

  public async getMyResponseForScenario(scenarioId: string): Promise<ScenarioResponse | undefined> {
    const uid = this.profileService.getUid();
    if (!uid) {
      return undefined;
    }
    const q = query(this.responsesRef,
      where("scenarioId", "==", scenarioId),
      where("uid", "==", uid),
      limit(1)
    );
    const d = await getDocs(q);
    console.log('getMyResponseForScenario', d);
    if (d.docs.length === 1) {
      return d.docs[0].data();
    } else {
      return undefined;
    }
  }

}
