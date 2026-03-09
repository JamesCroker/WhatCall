import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ScenarioUploadComponent } from './scenario-upload';

describe('FormComponents', () => {
  let component: ScenarioUploadComponent;
  let fixture: ComponentFixture<ScenarioUploadComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioUploadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
