import { inject, Injectable } from '@angular/core';
import {
  collection, getDocs, CollectionReference,
  doc, getDoc, setDoc, onSnapshot, DocumentSnapshot, QuerySnapshot,
  getFirestore, Firestore
} from '@angular/fire/firestore';

// Import the functions you need from the SDKs you need
import { ProfileService } from './profileService';

import { responseConverter, Scenario, scenarioConverter, ScenarioResponse, ScenarioStats, ScenarioWithResponses } from './types';
import { combineLatest, fromEventPattern, map, Observable, of } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';

/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ScenarioService {

  private firestore: Firestore

  constructor(
    private profileService: ProfileService
  ) {
    this.firestore = this.getFirestore();
  }

  /**
   * Retrieves a random video from the Firestore 'videos' collection.
   *
   * @returns A promise that resolves to a Scenario object.
   */
  public async getRandomScenarioId(): Promise<string> {
    const querySnapshot = (await getDocs(this.scenariosRef));
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    return querySnapshot.docs[randomIndex].data()['id'];
  }

  /**
   * Creates an Observable that emits a ScenarioWithResponses object for the Scenario document with the given ID, including the responses and stats.
   *
   * @param scenarioId
   * @returns
   */
  public getScenarioWithResponsesById$(scenarioId?: string): Observable<ScenarioWithResponses | undefined> {
    if (!scenarioId) {
      return of(undefined);
    }
    return combineLatest([
      this.getScenarioById$(scenarioId),
      this.getResponsesForScenario$(scenarioId),
      this.getMyResponseForScenario$(scenarioId)
    ]).pipe(
      map(([scenario, responses, myResponse]) => {
        if (!scenario) {
          return undefined;
        } else {
          const scenarioWithResponses: ScenarioWithResponses = {
            ...scenario,
            responses,
            myResponse,
            stats: calculateScenarioStats(scenario, responses)
          }
          return scenarioWithResponses;
        }
      })
    )
  }

  /**
   * Creates an Observable that emits the Scenario document with the given ID.
   *
   * Listen to real-time updates of the scenario document and map the Firestore document snapshot to
   * a Scenario object using the scenarioConverter.
   * Note: We use fromEventPattern to create an Observable from the onSnapshot listener.
   * @param scenarioId
   * @returns
   */
  private getScenarioById$(scenarioId: string): Observable<Scenario | undefined> {
    const docRef = doc(this.scenariosRef, scenarioId);
    return fromEventPattern<DocumentSnapshot<Scenario | undefined>>(
      (handler) => onSnapshot(docRef, handler),
      (handler, unsubscribe) => unsubscribe()
    ).pipe(
      map(docSnap => docSnap.data())
    );
  }

  public async addScenario(scenario: Omit<Scenario, 'id'>): Promise<string> {
    const newScenarioRef = doc(this.scenariosRef);
    await setDoc(newScenarioRef, scenario);
    console.debug('Scenario added with ID:', newScenarioRef.id);
    return newScenarioRef.id;
  }

  public async editScenario(scenarioId: string, scenario: Partial<Scenario>): Promise<void> {
    const scenarioRef = doc(this.scenariosRef, scenarioId);
    await setDoc(scenarioRef, scenario, { merge: true });
    console.debug('Scenario edited ID:', scenarioRef.id);
  }

  public async addResponse(scenarioId: string, response: string): Promise<void> {
    // Check if user is logged in
    const uid = this.profileService.getUid() || 'made up user'
    if (!uid) {
      throw new Error('User not logged in');
    }

    // Check if user has already responded to this scenario
    const responsesRef = this.responsesRef(scenarioId)
    const docRef = doc(responsesRef, uid);
    const docSnap = await getDoc(docRef);
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

  /**
   * Creates an Observable that emits the responses for the Scenario with the given ID.
   *
   * Listen to real-time updates of the responses subcollection for the scenario document and
   * map the Firestore query snapshot to an array of ScenarioResponse objects using the responseConverter.
   * Note: We use fromEventPattern to create an Observable from the onSnapshot listener.
   *
   * @param scenarioId
   * @returns
   */
  private getResponsesForScenario$(scenarioId: string): Observable<ScenarioResponse[]> {
    const colRef = this.responsesRef(scenarioId);
    return fromEventPattern<QuerySnapshot<ScenarioResponse>>(
      (handler) => onSnapshot(colRef, handler),
      (handler, unsubscribe) => unsubscribe()
    ).pipe(
      map(docSnap => docSnap.docs.map(doc => doc.data()))
    );
  }

  /**
   * Creates an Observable that emits the response for the current user for the Scenario with the given ID.
   *
   * Listen to real-time updates of the response document for the current user in the responses subcollection
   * for the scenario document and map the Firestore document snapshot to a ScenarioResponse object using the
   * responseConverter.
   *
   * Note: We use fromEventPattern to create an Observable from the onSnapshot listener.
   *
   * TODO: This currently assumes that the user is logged in and has a UID. We should handle the case where the
   * user is not logged in. We should also take UID as an Oberserble from the ProfileService and switch to the
   * appropriate response document when the UID changes (e.g. user logs in or out).
   *
   * @param scenarioId
   * @returns
   */
  public getMyResponseForScenario$(scenarioId: string): Observable<ScenarioResponse | undefined> {
    const uid = this.profileService.getUid() || '';
    const docRef = doc(this.responsesRef(scenarioId), uid);
    return fromEventPattern<DocumentSnapshot<ScenarioResponse | undefined>>(
      (handler) => onSnapshot(docRef, handler),
      (handler, unsubscribe) => unsubscribe()
    ).pipe(
      map(docSnap => docSnap.data())
    );
  }

  private responsesRef(scenarioId: string): CollectionReference {
    return collection(this.firestore, "scenarios", scenarioId, "responses").withConverter(responseConverter);
  }

  private get scenariosRef(): CollectionReference {
    return collection(this.firestore, "scenarios").withConverter(scenarioConverter);
  }

  public getFirestore() {
    return getFirestore(inject(FirebaseApp));
  }
}

function calculateScenarioStats(scenario: Scenario, respomses: ScenarioResponse[]): ScenarioStats {
  const optionCounts: { [key: string]: number } = {}
  scenario.options.forEach(option => optionCounts[option] = 0);

  respomses.forEach(response => {
    optionCounts[response.latestResponse] = (optionCounts[response.latestResponse] || 0) + 1;
  })

  return {
    totalResponses: respomses.length,
    optionCounts
  }

}