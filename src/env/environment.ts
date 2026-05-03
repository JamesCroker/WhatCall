import { FirebaseConfig, FirebaseEmulators } from "./types"

export const firebaseConfig: FirebaseConfig = {
  projectId: 'demo-test',
  appId: 'app-id',
  storageBucket: 'storage-bucket',
  apiKey: 'not-an-api-key',
  authDomain: 'auth-domain',
  messagingSenderId: 'messaging-sender-id',
  measurementId: 'measurement-id'
}

export const firebaseEmulators: FirebaseEmulators = {
  auth: 'http://127.0.0.1:9099',
  firestore: {
    host: '127.0.0.1',
    port: 8090
  },
  storage: {
    host: '127.0.0.1',
    port: 8092
  }
}