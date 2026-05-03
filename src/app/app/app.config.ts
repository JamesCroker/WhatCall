import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  autoAnonymousLogin,
  autoUpgradeAnonymousUsers,
  initializeUI,
  providerPopupStrategy
} from '@firebase-oss/ui-core';
import { provideFirebaseUI, provideFirebaseUIPolicies } from '@firebase-oss/ui-angular';
import { firebaseConfig, firebaseEmulators } from '../../env/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    provideFirestore(() => {
      const firestore = getFirestore()
      if (firebaseEmulators) {
        console.log('Connecting firestore emulator.')
        connectFirestoreEmulator(firestore, firebaseEmulators.firestore.host, firebaseEmulators.firestore.port)
      }
      return firestore
    }),

    provideStorage(() => {
      const storage = getStorage()
      if (firebaseEmulators) {
        console.log('Connecting storage emulator.')
        connectStorageEmulator(storage, firebaseEmulators.storage.host, firebaseEmulators.storage.port)
      }
      return storage
    }),

    provideAuth(() => {
      const auth = getAuth()
      if (firebaseEmulators) {
        console.log('Connectng auth emulator.')
        connectAuthEmulator(auth, firebaseEmulators.auth);
      }
      return auth;
    }),

    provideFirebaseUI((apps) => initializeUI({
      app: apps[0],
      behaviors: [
        autoAnonymousLogin(),
        autoUpgradeAnonymousUsers({
          async onUpgrade(ui, oldUserId, credential) {
            // Some account upgrade logic.
          }
        }),
        providerPopupStrategy()
      ],
    })),
    provideFirebaseUIPolicies(() => ({
      termsOfServiceUrl: 'https://www.google.com',
      privacyPolicyUrl: 'https://www.google.com',
    })),
  ]
};