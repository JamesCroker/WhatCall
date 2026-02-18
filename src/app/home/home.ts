import { Component } from '@angular/core';
import { ScenarioService } from '../../services/scenarioService';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

  constructor(
    private scenarioService: ScenarioService
  ) {
    console.log('App component initialized');
  }

  gotoRandomScenario() {
    this.scenarioService.gotoRandomScenario();
  }
}