import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthScreenComponent } from './auth-screen';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirebaseUI, provideFirebaseUIPolicies } from '@firebase-oss/ui-angular';
import { autoAnonymousLogin, autoUpgradeAnonymousUsers, initializeUI, providerPopupStrategy } from '@firebase-oss/ui-core';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { firebaseConfig } from '../../env/environment'

describe('AuthScreenComponent', () => {
  let component: AuthScreenComponent;
  let fixture: ComponentFixture<AuthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
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
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { }
          }
        }
      ],
      imports: [AuthScreenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthScreenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
