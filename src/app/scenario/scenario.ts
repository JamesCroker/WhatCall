import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Scenario, ScenarioService } from '../../services/scenarioService';
import { ResponseService, ScenarioStats } from '../../services/responseService';
import { ProfileService } from '../../services/profileService';
import { VideoPlayerComponent } from '../video-player/video-player';
import { UserResponseComponent } from '../user-response/user-response';
import { ResponsesChartComponent } from '../responses-chart/responses-chart';
import { Location } from '@angular/common';
import { ActiveScenarioService } from '../../services/activeScenarioService';

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
    private activeScenarioService: ActiveScenarioService,
    private responseService: ResponseService,
    private changeDetector: ChangeDetectorRef,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      await this.activeScenarioService.loadScenario(params['id']);
    })
    this.activeScenarioService.scenario$.subscribe(activeScenario => {
      this.scenario = activeScenario.scenario;
      this.userResponse = activeScenario.response?.latestResponse;
      this.location.replaceState(`/scenario/${activeScenario.scenario?.id}`);
      this.changeDetector.detectChanges();
    });
  }

  loadScenario(scenarioId?: string) {
    this.activeScenarioService.loadScenario(scenarioId);
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

}
