import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu';
import { provideRouter } from '@angular/router';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { UploadModalService } from '../upload/uploadModal';
import { Auth, User } from '@angular/fire/auth';
import { AuthModalService } from '../auth-screen/authModal';

class MockAuth {
  get currentUser(): User | null {
    return null;
  }
  onAuthStateChanged() { }
}

describe('MenuComponent', () => {

  let authLaunchSpy: jasmine.Spy<() => Promise<void>>;
  let uploadLaunchSpy: jasmine.Spy<() => Promise<void>>;
  let currentUserSpy: jasmine.Spy<(this: MockAuth) => User | null>;

  let fixture: ComponentFixture<MenuComponent>;
  let component: MenuComponent;

  beforeEach(async () => {

    const mockAuth = new MockAuth();

    currentUserSpy = spyOnProperty(mockAuth, 'currentUser', 'get')
    authLaunchSpy = jasmine.createSpy().and.resolveTo();
    uploadLaunchSpy = jasmine.createSpy().and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideRouter([]),
        { provide: ScenarioPageController, useValue: { } },
        { provide: UploadModalService, useValue: { launch: uploadLaunchSpy } },
        { provide: Auth, useValue: mockAuth },
        { provide: AuthModalService, useValue: { launch: authLaunchSpy } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(async () => {
    authLaunchSpy

  })

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('auth-screen should be launched if user is not authenticated', async () => {
    currentUserSpy.and.returnValues(null, { x: true } as any as User);
    authLaunchSpy.and.resolveTo();
    await component.launchUpload();
    expect(authLaunchSpy).toHaveBeenCalled();
    expect(uploadLaunchSpy).toHaveBeenCalled();
  });

  it('upload should not be launched if authentication is aborted', async () => {
    currentUserSpy.and.returnValues(null, null);
    authLaunchSpy.and.resolveTo();
    await component.launchUpload();
    expect(authLaunchSpy).toHaveBeenCalled();
    expect(uploadLaunchSpy).not.toHaveBeenCalled();
  });

  it('auth-screen should be bypassed in user is already authenticated', async () => {
    currentUserSpy.and.returnValue({ x: true } as any as User);
    authLaunchSpy.and.resolveTo();
    await component.launchUpload();
    expect(authLaunchSpy).not.toHaveBeenCalled();
    expect(uploadLaunchSpy).toHaveBeenCalled();
  });
});
