import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
/**
 * Video data model.
 */
export interface Scenario {
  id: string;
  title: string;
  url: string;
  uid: string;
  scenarioType: string;
  options: string[];
}

export interface ScenarioWithResponses extends Scenario {
    responses: ScenarioResponse[];
    stats: ScenarioStats;
    myResponse?: ScenarioResponse;
}

export interface ScenarioResponse {
  id: string;
  uid: string;
  scenarioId: string;
  latestResponse: string;
  firstResponse: string;
}

export interface ScenarioStats {
  totalResponses: number;
  optionCounts: { [option: string]: number };
}

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