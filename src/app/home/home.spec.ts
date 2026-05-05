import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([])
      ],
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
