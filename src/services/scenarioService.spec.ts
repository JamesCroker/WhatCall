import { TestBed } from '@angular/core/testing';
import { ScenarioService } from './scenarioService';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

describe('ScenarioService', () => {
  let service: ScenarioService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: {} }
      ]
    });

    spyOn(ScenarioService.prototype, 'getFirestore')
      .and
      .callFake(() => {
        return {} as Firestore
      });

    service = TestBed.inject(ScenarioService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
