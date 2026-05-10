import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
import { ScenarioResponse, Scenario } from "../types/types";

export const responseConverter: FirestoreDataConverter<ScenarioResponse> = {

  toFirestore(response: ScenarioResponse): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * Firestore data converter for Video objects.
 */
export const scenarioConverter: FirestoreDataConverter<Scenario> = {

  toFirestore(video: Scenario): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      scenarioType: data['scenarioType']
    } as Scenario;
  }
};
