import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthScreenComponent } from './auth-screen';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirebaseUI, provideFirebaseUIPolicies } from '@firebase-oss/ui-angular';
import { autoAnonymousLogin, autoUpgradeAnonymousUsers, initializeUI, providerPopupStrategy } from '@firebase-oss/ui-core';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('AuthScreenComponent', () => {
  let component: AuthScreenComponent;
  let fixture: ComponentFixture<AuthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp({
          projectId: "whatcall-52d6a",
          appId: "1:139166244778:web:4f0914dc3a5eca506955d3",
          storageBucket: "whatcall-52d6a.firebasestorage.app",
          apiKey: "AIzaSyD1O8ZHNunSbIULlIYtenA6VWeq-y1o5As",
          authDomain: "whatcall-52d6a.firebaseapp.com",
          messagingSenderId: "139166244778",
          measurementId: "G-TDXW9BDJ3G"
        })),
        provideAuth(() => getAuth()),
        provideFirebaseUI((apps) => initializeUI({
          app: apps[0],
          behaviors: [
            autoAnonymousLogin(),
            autoUpgradeAnonymousUsers(),
            providerPopupStrategy()
          ],
        })),
        provideFirebaseUIPolicies(() => ({
          termsOfServiceUrl: 'https://www.google.com',
          privacyPolicyUrl: 'https://www.google.com',
        })),
      ],
      imports: [AuthScreenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
