import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ScenarioPageController {

  /**
   * Observable for activeScenarioId (or undefined)
   */
  public readonly activeScenarioId$: BehaviorSubject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);

  /**
   * Set the activeScenarioId
   *
   * @param {string | undefined} scenarioId New activeScenario Id, or undefined to unset.
   */
  loadScenario(scenarioId?: string) {
    this.activeScenarioId$.next(scenarioId);
  }

}
