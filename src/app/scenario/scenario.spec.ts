import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComponent } from './scenario';

describe('Scenario', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
