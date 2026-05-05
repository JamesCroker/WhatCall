import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  async loadScenario(scenarioId?: string) {
    this.activeScenarioId$.next(scenarioId);
  }

}
