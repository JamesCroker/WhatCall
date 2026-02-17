import { Component } from '@angular/core';
import { ScenarioService } from '../../services/scenarioService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
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

  gotoRandomScenario() {
    // Logic to navigate to a random scenario
    console.log('Navigating to a random scenario');
    this.scenarioService.getRandomScenario().then(scenario => {
      console.log('Random Scenario ID:', scenario.id);
      // Here you would typically use a router to navigate
      // this.router.navigate(['/scenario', scenario.id]);
      this.router.navigate(['/scenario', scenario.id]);
    });
  }

}