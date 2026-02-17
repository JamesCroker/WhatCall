import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scenario, ScenarioService } from '../../services/scenarioService';
import { ResponseService } from '../../services/responseService';
import { ProfileService } from '../../services/profileService';
import { VideoPlayerComponent } from '../video-player/video-player';
import { UserResponseComponent } from '../user-response/user-response';
import { RespondCompareComponent } from '../respond-compare/respond-compare';

@Component({
  selector: 'app-scenario',
  imports: [VideoPlayerComponent, UserResponseComponent, RespondCompareComponent],
  templateUrl: './scenario.html',
  styleUrl: './scenario.scss',
})
export class ScenarioComponent implements OnInit {

  public scenario: Scenario | undefined = undefined;
  public userResponse: string | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scenarioService: ScenarioService,
    private responseService: ResponseService,
    private profileService: ProfileService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const scenarioId = params['id'];
      console.log('ScenarioComponent: scenarioId from route params', scenarioId);
      await this.profileService.login();
      const [scenario, userResponse] = await Promise.all([
        this.scenarioService.getScenarioById(scenarioId),
        this.responseService.getMyResponseForScenario(scenarioId)
      ]);
      console.log('Fetching scenario', scenario)
      this.scenario = scenario;
      this.userResponse = userResponse?.response;
      console.log('User response', this.userResponse);
      this.changeDetector.detectChanges();
    });
  }


  selectionMade(userResponse: string) {
    if (!this.scenario) {
      throw new Error('No scenario loaded');
    }
    this.userResponse = userResponse;
    this.responseService.addResponse(this.scenario.id, userResponse)
    // this.compare.userResponse = userResponse;
    this.changeDetector.detectChanges();
    if (this.scenario) {
      this.scenarioService.getScenarioStats(this.scenario.id).then((stats) => {
        console.log('Stats retrieved', stats);
      })
    } else {
      throw new Error('No scenario loaded');
    }
  }


}
