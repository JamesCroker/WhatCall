import { TestBed } from '@angular/core/testing';
import { ScenarioService } from './scenarioService';
import { Firestore } from '@angular/fire/firestore';
import { ProfileService } from './profileService';

describe('ScenarioService', () => {
  let service: ScenarioService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileService,
          useValue: {
            getUid: () => '123'
          }
        },
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
