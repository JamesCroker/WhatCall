import { TestBed } from '@angular/core/testing';

import { StorageService } from './storageService';
import { FirebaseStorage } from '@angular/fire/storage';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    spyOn(StorageService.prototype, 'getFirebaseStorage')
      .and
      .callFake(() => {
        return {} as FirebaseStorage
      });

    service = TestBed.inject(StorageService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
