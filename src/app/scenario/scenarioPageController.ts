import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { ScenarioService, ScenarioWithResponses } from '../../services';
import { BehaviorSubject, map, Observable, switchAll } from 'rxjs';

/**
/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ScenarioPageController {

  public activeScenarioId$: BehaviorSubject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);

  public activeScenario$: Observable<ScenarioWithResponses | undefined> = this.activeScenarioId$
    .pipe(
      map(scenarioId => this.scenarioService.getScenarioWithResponsesById$(scenarioId)),
      switchAll()
    );

  constructor(
    private scenarioService: ScenarioService
  ) {
  }

  async loadScenario(scenarioId?: string) {

    if (!scenarioId) {
      scenarioId = await this.scenarioService.getRandomScenarioId()
    }
    this.activeScenarioId$.next(scenarioId);
  }

}