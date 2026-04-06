import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UploadModalService } from '../upload/uploadModal';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(
    private router: Router,
    private scenarioPageController: ScenarioPageController,
    private uploadModalService: UploadModalService
  ) { 
    // Empty constructor for dependency injection
  }

  gotoRandonScenario() {
    this.router.navigate(['/scenario']);
    this.scenarioPageController.loadScenario();
  }

  launchUpload() {
    this.uploadModalService.launch();
  } 
}
