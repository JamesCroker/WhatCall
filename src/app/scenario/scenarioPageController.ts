import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { ScenarioService, ScenarioWithResponses, ProfileService } from '../../services';
import { BehaviorSubject, map, Observable, switchAll, switchMap, tap } from 'rxjs';

/**
/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ScenarioPageController {

  private activeScenarioId$: BehaviorSubject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);

  /**
   * Observable that emits the active ScenarioWithResponses object based on the activeScenarioId$, including the responses and stats.
   * The component can subscribe to this Observable to get updates whenever the active scenario changes.
   */
  public activeScenario$: Observable<ScenarioWithResponses | undefined>
    = this.activeScenarioId$
      .pipe(
        tap(
          scenarioId => console.log('Scenario ID changed in controller', scenarioId)
        ),
        map(scenarioId => this.scenarioService.getScenarioWithResponsesById$(scenarioId)),
        switchAll()
      );

  constructor(
    private profileService: ProfileService,
    private scenarioService: ScenarioService
  ) {
  }

  async loadScenario(scenarioId?: string) {
    await this.profileService.login();
    if (!scenarioId) {
      scenarioId = await this.scenarioService.getRandomScenarioId()
    }
    this.activeScenarioId$.next(scenarioId);
  }

}
