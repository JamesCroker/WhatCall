import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenarioService, ScenarioWithResponses } from '../../services';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { VideoPlayerComponent } from '../video-player/video-player';
import { ResponsesChartComponent } from '../responses-chart/responses-chart';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenario',
  imports: [VideoPlayerComponent, ResponsesChartComponent, MatButtonModule,
    CommonModule, MatStepperModule, ReactiveFormsModule],
  templateUrl: './scenario.html',
  styleUrl: './scenario.scss',
})
export class ScenarioComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  public scenario$: Observable<ScenarioWithResponses | undefined>;
  private scenario: ScenarioWithResponses | undefined = undefined;

  public stepperDuration = '';

  firstFormGroup = new FormGroup({
  });
  secondFormGroup = new FormGroup({
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageController: ScenarioPageController,
    private scenarioService: ScenarioService,
    private changeDetector: ChangeDetectorRef,
    private location: Location
  ) {
    this.scenario$ = this.pageController.activeScenario$;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      await this.pageController.loadScenario(params['id']);
    })
    this.scenario$.subscribe(activeScenario => {
      this.scenario = activeScenario;
      this.location.replaceState(`/scenario/${activeScenario?.id}`);
      this.changeDetector.detectChanges();
    });
  }

  loadScenario(scenarioId?: string) {
    this.pageController.loadScenario(scenarioId);
  }

  async selectionMade(userResponse: string) {
    if (!this.scenario) {
      throw new Error('No scenario loaded');
    }
    this.scenarioService.addResponse(this.scenario.id, userResponse)
  }

  gotoNext() {
    this.pageController.loadScenario();
    this.stepperDuration = '0ms';
    this.stepper.reset();
    this.stepper.animationDone.asObservable().subscribe(() => {
      this.stepperDuration = '';
    })
  }

}