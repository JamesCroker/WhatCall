import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { Scenario, ScenarioService } from './scenarioService';
import { ProfileService } from './profileService';
import { ResponseService, ScenarioResponse } from './responseService';
import { BehaviorSubject } from 'rxjs';

interface ActiveScenario {
  scenario: Scenario | undefined;
  response: ScenarioResponse | undefined;
}
/**
/**
 * Service to interact with video data from Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ActiveScenarioService {

  public readonly scenario$: BehaviorSubject<ActiveScenario> = new BehaviorSubject<ActiveScenario>({ scenario: undefined, response: undefined });

  constructor(
    private profileService: ProfileService,
    private scenarioService: ScenarioService,
    private responseService: ResponseService,
  ) {
  }

  async loadScenario(scenarioId?: string) {
    await this.profileService.login();
    if (!scenarioId) {
      const activeScenario: ActiveScenario = {
        scenario: await this.scenarioService.getRandomScenario(),
        response: undefined
      }
      activeScenario.response = await this.responseService.getMyResponseForScenario(activeScenario.scenario!.id);
      this.scenario$.next(activeScenario);

    } else {
      const [scenario, response] = await Promise.all([
        this.scenarioService.getScenarioById(scenarioId),
        this.responseService.getMyResponseForScenario(scenarioId)
      ]);
      this.scenario$.next({ scenario, response });

    }
  }

}
