import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenarioService } from '../../services';
import { ScenarioWithResponses } from '../../types';
import { ScenarioPageController } from '../scenario/scenarioPageController';
import { VideoPlayerComponent } from '../video-player/video-player';
import { ResponsesChartComponent } from '../responses-chart/responses-chart';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, mergeMap, switchAll } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenario',
  standalone: true,
  imports: [VideoPlayerComponent, ResponsesChartComponent, MatButtonModule,
    CommonModule, MatStepperModule, ReactiveFormsModule],
  templateUrl: './scenario.html',
  styleUrl: './scenario.scss',
})
export class ScenarioComponent implements OnInit {

  /**
   * The MatStepper page element - referenced from the HTML.
   */
  @ViewChild('stepper') stepper!: MatStepper;

  /**
   * Observable that emits the active ScenarioWithResponses object based on the activeScenarioId$
   * including the responses and stats.
  **/
  public scenario$: Observable<ScenarioWithResponses | undefined>;

  /** active scenario tracks most recent response recived from scenario$ observable. */
  private scenario: ScenarioWithResponses | undefined = undefined;

  /** The duration of animation for the mat-stepper */
  public stepperDuration = '';

  /** Empty FromGroup object, used for first mat-stepper page. */
  firstFormGroup = new FormGroup({});

  /** Empty FromGroup object, used for second mat-stepper page. */
  secondFormGroup = new FormGroup({});

  constructor(
    /** injected ActivatedRoute service */
    private activatedRoute: ActivatedRoute,

    /** injected ScenarioPageController service */
    private pageController: ScenarioPageController,

    /** injected ScenarioService service */
    private scenarioService: ScenarioService,

    /** injected ChangeDetectorRef service */
    private changeDetector: ChangeDetectorRef,

    /** injected Location service */
    private location: Location
  ) {

    // Subscrive to activeScenarioId$ (from pageController)
    this.scenario$ = this.pageController.activeScenarioId$.pipe(
      // If there is no activeScenarioId (undefined) get a random scenario id
      // Input  scenarioId : string | undefined (if no id specified)
      // Output scenarioId : string
      mergeMap(scenarioId => {
        console.log('ScenarioComponent: activeScenarioId', scenarioId);
        if (!scenarioId) {
          return this.scenarioService.getRandomScenarioId()
        } else {
          return Promise.resolve(scenarioId);
        }
      }),

      // Fetch a observable for the ScenarioWithResponses object for the specified scenarioId
      // Input  scenarioId: string
      // Output Observable<ScenarioWithResponses | undefined>
      map(scenarioId => this.scenarioService.getScenarioWithResponsesById$(scenarioId)),

      // Switch the observable returned to the ScenarioWithResponses observable
      // Input  Observable<ScenarioWithResponses | undefined>
      // Output ScenarioWithResponses | undefined
      switchAll()
    );
  }

  /**
   * Angular OnInit event
   */
  ngOnInit(): void {
    // Subscribe to the ActiveRoute path parameters, and set the :id as the activeScenarioId, using
    // the pageController service.
    this.activatedRoute.params.subscribe(async params => {
      await this.pageController.loadScenario(params['id']);
    })

     // Subsctive to scenario$ and:
     //  - store the result in this.scenario.
     //  - update the URL to /scenario/:id
    this.scenario$.subscribe(activeScenario => {
      this.scenario = activeScenario;
      this.location.replaceState(`/scenario/${activeScenario?.id}`);
      this.changeDetector.detectChanges();
    });
  }

  /**
   * Handler for when a user selects a response option button.
   *
   * Adds the user's response to the Firestore responses collection using the scenarioService
   *
   * @param {string} userResponse The text of the response selected by the user
   * @returns {Promise<void>} A promise that resolves once Firestore is updated
   */
  async selectionMade(userResponse: string) {
    if (!this.scenario) {
      throw new Error('No scenario loaded');
    }
    this.scenarioService.addResponse(this.scenario.id, userResponse)
  }

  /**
   * goto next randomly selected scenario.
   */
  gotoNext() {
    // select another random scenaro by calling page controller without scenarioId specified.
    this.pageController.loadScenario();

    // move the stepper back to page-1 without annimation
    this.stepperDuration = '0ms';
    this.stepper.reset();

    // Subscribe to the animationDone event and once (0ms) animation is complete turn animation back on
    this.stepper.animationDone.asObservable().subscribe(() => {
      this.stepperDuration = '';
    })
  }

}
