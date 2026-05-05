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
@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {

  public isLoggedIn = false;

  private snackbar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private scenarioPageController: ScenarioPageController,
    private uploadModalService: UploadModalService,
    private auth: Auth,
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

  gotoRandonScenario() {
    this.router.navigate(['/scenario']);
    this.scenarioPageController.loadScenario();
  }

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

  signOut() {
    this.auth.signOut();
  }

}
