import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Scenario, ScenarioService } from '../../services/scenarioService';
import { ResponseService, ScenarioStats } from '../../services/responseService';
import { ProfileService } from '../../services/profileService';
import { VideoPlayerComponent } from '../video-player/video-player';
import { UserResponseComponent } from '../user-response/user-response';
import { ResponsesChartComponent } from '../responses-chart/responses-chart';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scenario',
  imports: [VideoPlayerComponent, UserResponseComponent, ResponsesChartComponent, RouterLink],
  templateUrl: './scenario.html',
  styleUrl: './scenario.scss',
})
export class ScenarioComponent implements OnInit {

  public scenario: Scenario | undefined = undefined;
  public scenarioStats: ScenarioStats | undefined = undefined;
  public userResponse: string | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scenarioService: ScenarioService,
    private responseService: ResponseService,
    private profileService: ProfileService,
    private changeDetector: ChangeDetectorRef,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let scenarioId = params['id'];
      console.log('ScenarioComponent: scenarioId from route params', scenarioId);
      await this.profileService.login();
      await this.loadScenario(scenarioId);
    })
  }

  async loadScenario(scenarioId?: string) {
    if (!scenarioId) {
      this.scenario = await this.scenarioService.getRandomScenarioId();
      this.location.replaceState(`/scenario/${this.scenario.id}`);
      this.userResponse = (await this.responseService.getMyResponseForScenario(this.scenario.id))?.latestResponse;

    } else {
      const [scenario, userResponse] = await Promise.all([
        this.scenarioService.getScenarioById(scenarioId),
        this.responseService.getMyResponseForScenario(scenarioId)
      ]);
      this.scenario = scenario;
      this.userResponse = userResponse?.latestResponse;
    }
    this.changeDetector.detectChanges();
  }

  async selectionMade(userResponse: string) {
    if (!this.scenario) {
      throw new Error('No scenario loaded');
    }
    this.userResponse = userResponse;
    this.responseService.addResponse(this.scenario.id, userResponse)
    this.changeDetector.detectChanges();
    if (this.scenario) {
      this.responseService.getScenarioStats(this.scenario.id).then((stats) => {
        this.scenarioStats = stats;
        this.changeDetector.detectChanges();
        console.log('Stats retrieved', stats);
      })
    } else {
      throw new Error('No scenario loaded');
    }
  }

  async gotoRandomScenario() {
    await this.loadScenario();
  }

}
