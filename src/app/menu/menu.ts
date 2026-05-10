import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadModalService } from '../upload/uploadModal';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthModalService } from '../auth-screen/authModal';

/**
 * Page header and drop-down menu
 */
@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {

  /** Is the user signed-in non-anonymously */
  public isLoggedIn = false;

  /** Injected MatSnackBar service */
  private snackbar = inject(MatSnackBar);

  constructor(
    /** Injected Router serice */
    private router: Router,

    /** Injected ScenarioPageController service */
    private scenarioPageController: ScenarioPageController,

    /** Injected UploadModalService service */
    private uploadModalService: UploadModalService,

    /** Injected Auth service */
    private auth: Auth,

    /** Injected AuthModalService service */
    private authModalService: AuthModalService

  ) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  /**
   * Navigates the user to a random scenario.
   */
  gotoRandomScenario() {
    this.router.navigate(['/scenario']);
    this.scenarioPageController.loadScenario();
  }

  /**
   * Launches the UploadModal to allow a user to upload a new video.
   *
   * If the user is not signed-in first launch the AuthModal to enable the user to sign-in.
   *
   * Only launch the UploadModal if the user successfully signs in, otherwise display a snackbar
   * with a 'sign-in required' error message.
   *
   * @returns {Promise<void>} A promise which resolves when the upload modal closes.
   */
  async launchUpload() {
    if (!this.auth.currentUser) {
      await this.authModalService.launch();
    }
    if (!this.auth.currentUser) {
      this.snackbar.open('You need to be signed in to upload a scenario', 'Close', { duration: 3000 });
      return;
    }
    this.uploadModalService.launch();
  }

  /**
   * Sign the current user out
   */
  signOut() {
    this.auth.signOut();
  }

}
