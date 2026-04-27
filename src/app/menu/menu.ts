import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UploadModalService } from '../upload/uploadModal';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {

  public isLoggedIn = false;

  constructor(
    private router: Router,
    private scenarioPageController: ScenarioPageController,
    private uploadModalService: UploadModalService,
    private auth: Auth
  ) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.debug('User signed in:', user);
        this.isLoggedIn = true;
      } else {
        console.debug('User signed out');
        this.isLoggedIn = false;
      }
    })
  }

  gotoRandonScenario() {
    this.router.navigate(['/scenario']);
    this.scenarioPageController.loadScenario();
  }

  launchUpload() {
    this.uploadModalService.launch();
  }

  signOut() {
    this.auth.signOut();
  }

}