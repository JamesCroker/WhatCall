import { Injectable } from '@angular/core';
import {
  getFirestore, collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter,
  CollectionReference,
  addDoc,
  query,
  where,
  doc,
  getDocs,
  limit,
  setDoc,
  getDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseService } from './firebaseService';
import { ProfileService } from './profileService';

export interface ScenarioResponse {
  id: string;
  uid: string;
  scenarioId: string;
  latestResponse: string;
  firstResponse: string;
}

export interface ScenarioStats {
  scenarioId: string;
  totalResponses: number;
  optionCounts: { [option: string]: number };
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
      latestResponse: data['latestResponse'],
      firstResponse: data['firstResponse'],
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



  constructor(
    private firebaseService: FirebaseService,
    private profileService: ProfileService
  ) {
    // Initialize Firebase
    const analytics = getAnalytics(this.firebaseService.firebaseApp);
  }

  public async addResponse(scenarioId: string, response: string): Promise<void> {
    console.log(this.profileService.getUid())

    // Check if user is logged in
    const uid = this.profileService.getUid() || 'made up user'
    if (!uid) {
      throw new Error('User not logged in');
    }

    // Check if user has already responded to this scenario
    const responsesRef = this.responsesRef(scenarioId)
    const docRef = doc(responsesRef, uid);
    const docSnap = await getDoc(docRef);
    console.log('getDocs result:', docSnap);
    if (docSnap.exists()) {
      // User has already responded, update the existing response 
      await setDoc(docRef, {
        latestResponse: response
      }, { merge: true });
    } else {
      // User has not responded, create a new response document
      await setDoc(docRef, {
        scenarioId,
        latestResponse: response,
        firstResponse: response,
        uid,
        id: ''
      }
      );
    }
  }

  public async getResponsesForScenario(scenarioId: string): Promise<ScenarioResponse[]> {
    const responsesRef = this.responsesRef(scenarioId);
    const d = await getDocs(responsesRef);
    return d.docs.map(doc => doc.data());
  }

  public async getMyResponseForScenario(scenarioId: string): Promise<ScenarioResponse | undefined> {
    const uid = this.profileService.getUid();
    if (!uid) {
      return undefined;
    }
    const docRef = doc(this.responsesRef(scenarioId), uid);
    const docSnap = await getDoc(docRef);
    console.log('getMyResponseForScenario', docSnap);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }
  }
  /**
    * 
    * @param scenarioId 
    * @returns 
    */
  public async getScenarioStats(scenarioId: string): Promise<ScenarioStats> {
    const responses = await this.getResponsesForScenario(scenarioId);
    const optionCounts: { [key: string]: number } = {}
    responses.forEach(response => {
      optionCounts[response.latestResponse] = (optionCounts[response.latestResponse] || 0) + 1;
    })

    return {
      scenarioId,
      totalResponses: responses.length,
      optionCounts
    }
  }
  private responsesRef(scenarioId: string): CollectionReference<ScenarioResponse> {
    const db = getFirestore(this.firebaseService.firebaseApp);
    return collection(db, "scenarios", scenarioId, "responses").withConverter(responseConverter);
  }

}