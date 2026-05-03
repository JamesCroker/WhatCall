export type FirebaseEmulators = FirebaseEmulatorConfig | null;

export interface FirebaseEmulatorConfig {
  auth: string,
  firestore: {
    host: string,
    port: number
  },
  storage: {
    host: string,
    port: number
  }
}

export interface FirebaseConfig {
  projectId: string,
  appId: string,
  storageBucket: string,
  apiKey: string,
  authDomain: string,
  messagingSenderId: string,
  measurementId: string
}