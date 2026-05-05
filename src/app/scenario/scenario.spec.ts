import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComponent } from './scenario';
import { provideRouter } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { ScenarioService } from '../../services';
import { ScenarioPageController } from './scenarioPageController';

describe('Scenario', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ScenarioService, useValue: { } },
        ScenarioPageController
      ],
      imports: [ScenarioComponent]
    })
      .compileComponents();

    spyOn(ScenarioService.prototype, 'getFirestore')
      .and
      .callFake(() => {
        return {} as Firestore
      });

    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
