import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Scenario, ScenarioService } from '../../services/scenarioService';
import { VideoPlayer } from '../video-player/video-player';
import { UserResponse } from '../user-response/user-response';
import { RespondCompare } from '../respond-compare/respond-compare';
import { ProfileService } from '../../services/profileService';
import { ResponseService } from '../../services/responseService';

@Component({
  selector: 'app-root',
  imports: [VideoPlayer, RouterOutlet, UserResponse, RespondCompare],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  @ViewChild('response', { static: true }) response!: UserResponse;
  @ViewChild('compare', { static: true }) compare!: RespondCompare;
  public scenario: Scenario | null = null;

  public userResponse: string = '';

  constructor(
    private responseService: ResponseService,
    private scenarioService: ScenarioService,
    private profileService: ProfileService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    // Initialization logic if needed
    console.log('Loggin in');
    this.profileService.login().then(() => {
      console.log('User UID:', this.profileService.getUid());
    });

    this.scenarioService.getScenario().then(scenario => {
      this.scenario = scenario;
      this.changeDetector.detectChanges();
    });
  }

  selectionMade(userResponse: string) {
    this.userResponse = userResponse;
    this.response.visible = false;
    this.compare.visible = true;
    // this.compare.userResponse = userResponse;
    this.changeDetector.detectChanges();
    if (this.scenario) {
      this.responseService.addResponse(this.scenario.id, userResponse)
    } else {
      throw new Error('No scenario loaded');
    }
  }

}
