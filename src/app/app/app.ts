import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioComponent } from '../scenario/scenario';
import { ActiveScenarioService } from '../../services/activeScenarioService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(
    private router: Router,
    private activeScenarioService: ActiveScenarioService
  ) {

  }

  gotoRandonScenario() {
    this.router.navigate(['/scenario']);
    this.activeScenarioService.loadScenario();
  }

}
