import { Component } from '@angular/core';
import { ScenarioService } from '../../services/scenarioService';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatMenuModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

  constructor(
    private scenarioService: ScenarioService,
    private router: Router
  ) {
    console.log('App component initialized');
  }

  gotoUploadScenario() {
    this.router.navigate(['/scenario-upload', 1]);
  }
}