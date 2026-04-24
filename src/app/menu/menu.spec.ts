import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu';
import { ActivatedRoute } from '@angular/router';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { UploadModalService } from '../upload/uploadModal';

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          },
        },
        {
          provide: ScenarioPageController,
          useValue: {
          },
        },
        {
          provide: UploadModalService,
          useValue: {
          },
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, whatcall');
  });
  */

});
