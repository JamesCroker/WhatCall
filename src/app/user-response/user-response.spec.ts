import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResponse } from './user-response';

describe('UserResponse', () => {

  let component: UserResponse;
  let fixture: ComponentFixture<UserResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
