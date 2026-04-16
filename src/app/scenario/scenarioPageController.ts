import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { BehaviorSubject } from 'rxjs';

/**
/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class ScenarioPageController {

  public readonly activeScenarioId$: BehaviorSubject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);
    
  constructor(
  ) {
  }

  async loadScenario(scenarioId?: string) {
    this.activeScenarioId$.next(scenarioId);
  }

}
