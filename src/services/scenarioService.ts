import { Injectable } from '@angular/core';
import {
  getFirestore, collection, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter,
  CollectionReference,
  doc,
  getDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseService } from './firebaseService';
//import { ProfileService } from './profileService';
import { ResponseService } from './responseService';


/**
 * Video data model.
 */
export interface Scenario {
  id: string;
  title: string;
  url: string;
  uid: string;
  options: string[];
}


export interface ScenarioStats {
  scenarioId: string;
  totalResponses: number;
  optionCounts: { [option: string]: number };
}

/**
 * Firestore data converter for Video objects.
 */
const scenarioConverter: FirestoreDataConverter<Scenario> = {

  toFirestore(video: Scenario): DocumentData {
    const firebaseVideo: any = video;
    delete firebaseVideo.id; // ID is stored in document ID, not in data
    return firebaseVideo
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Scenario {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      title: data['title'],
      url: data['url'],
      uid: data['uid'],
      options: data['options'],
    } as Scenario;
  }
};


/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ScenarioService {

  private get scenariosRef(): CollectionReference<Scenario> {
    const db = getFirestore(this.firebaseService.firebaseApp);
    return collection(db, "scenarios").withConverter(scenarioConverter);
  }

  constructor(
    private firebaseService: FirebaseService,
    private responseService: ResponseService,
  ) {
    // Initialize Firebase
    const analytics = getAnalytics(this.firebaseService.firebaseApp);
  }

  /**
   * Retrieves a random video from the Firestore 'videos' collection.
   * 
   * @returns A promise that resolves to a Scenario object. 
   */
  public async getRandomScenario(): Promise<Scenario> {
    const querySnapshot = await getDocs(this.scenariosRef);
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    return querySnapshot.docs[randomIndex].data();
  }


  /**
   * description
   * 
   * more text
   * 
   * @param scenarioId 
   * @returns 
   */
  public async getScenarioById(scenarioId: string): Promise<Scenario | undefined> {
    const docRef = doc(this.scenariosRef, scenarioId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();

  }

  /**
   * 
   * @param scenarioId 
   * @returns 
   */
  public async getScenarioStats(scenarioId: string): Promise<ScenarioStats> {
    const responses = await this.responseService.getResponsesForScenario(scenarioId);
    const optionCounts: { [key: string]: number } = {}
    responses.forEach(response => {
      optionCounts[response.response] = ( optionCounts[response.response] || 0 ) + 1;
    })

    return {
      scenarioId,
      totalResponses: responses.length,
      optionCounts
    }
  }


}