export type FirebaseEmulators = FirebaseEmulatorConfig | null;

/**
 * Optional configuration to set the application to use Firebase emulator
 * @member {string} auth URL of the auth emulator e.g. 'https://localhost:8001'
 * @member firestore Endpoint for the firestore emulator
 * @member storage Endpoint for the storage mulator
 */
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
