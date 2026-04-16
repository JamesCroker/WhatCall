import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload';
import { ProfileService, ScenarioService, StorageService } from '../../services';
import { MatDialogRef } from '@angular/material/dialog';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { }
          }
        },
        {
          provide: StorageService,
          useValue: {
          }
        },
        {
          provide: ScenarioService,
          useValue: {
          }
        }
        ,
        {
          provide: ProfileService,
          useValue: {
          }
        }
      ],
      imports: [UploadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
