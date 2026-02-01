import { Injectable } from '@angular/core';
import {
  getFirestore, collection, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter,
  CollectionReference, 
  addDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseService } from './firebaseService';
import { ProfileService } from './profileService';


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
    private profileService: ProfileService
  ) {
    // Initialize Firebase
    const analytics = getAnalytics(this.firebaseService.firebaseApp);
  }

  /**
   * Retrieves a random video from the Firestore 'videos' collection.
   * 
   * @returns A promise that resolves to a Scenario object. 
   */
  public async getScenario(): Promise<Scenario> {
    const querySnapshot = await getDocs(this.scenariosRef);
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    return querySnapshot.docs[randomIndex].data();
  }

}