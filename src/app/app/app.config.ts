import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  autoAnonymousLogin,
  autoUpgradeAnonymousUsers,
  initializeUI,
  providerPopupStrategy
} from '@firebase-oss/ui-core';
import { provideFirebaseUI, provideFirebaseUIPolicies } from '@firebase-oss/ui-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "whatcall-52d6a",
      appId: "1:139166244778:web:4f0914dc3a5eca506955d3",
      storageBucket: "whatcall-52d6a.firebasestorage.app",
      apiKey: "AIzaSyD1O8ZHNunSbIULlIYtenA6VWeq-y1o5As",
      authDomain: "whatcall-52d6a.firebaseapp.com",
      messagingSenderId: "139166244778",
      measurementId: "G-TDXW9BDJ3G"
      /// projectNumber: "139166244778",
      // version: "2"
    })),
    provideAuth(() => getAuth()),
    provideFirebaseUI((apps) => initializeUI({
      app: apps[0],
      behaviors: [
        autoAnonymousLogin(),
        autoUpgradeAnonymousUsers({
          /*
          async onUpgrade(ui, oldUserId, credential) {
            // Some account upgrade logic.
          }
          */
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