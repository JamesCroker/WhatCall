export type FirebaseEmulators = FirebaseEmulatorConfig | null;

/**
 * Optional configuration to set the application to use Firebase emulator
 */
export interface FirebaseEmulatorConfig {
  /** URL of the auth emulator e.g. 'https://localhost:8001' */
  auth: string,
  /** Endpoint for the firestore emulator */
  firestore: {
    host: string,
    port: number
  },
  /** storage Endpoint for the storage emulator */
  storage: {
    host: string,
    port: number
  }
}

/**
 * Firebase configuration, provided by the Firebase console.
 */
export interface FirebaseConfig {
  projectId: string,
  appId: string,
  storageBucket: string,
  apiKey: string,
  authDomain: string,
  messagingSenderId: string,
  measurementId: string
}
