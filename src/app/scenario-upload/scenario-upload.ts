import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profileService';
import { ActivatedRoute } from '@angular/router';
import { ScenarioService } from '../../services/scenarioService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scenario-upload',
  templateUrl: './scenario-upload.html',
  styleUrls: ['./scenario-upload.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ScenarioUploadComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    scenarioType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl(''),
    options: new FormArray([], Validators.required)
  });
  payLoad: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private scenarioService: ScenarioService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const scenarioId = params['id'];
      console.log('ScenarioComponent: scenarioId from route params', scenarioId);
      await this.profileService.login();
    });
  }

  addOption(): void {
    const optionsArray = this.form.get('options') as FormArray;
    optionsArray.push(new FormControl('', Validators.required));
  }

  removeOption(index: number): void {
    const optionsArray = this.form.get('options') as FormArray;
    optionsArray.removeAt(index);
  }

  get optionsArray(): FormArray {
    return this.form.get('options') as FormArray;
  }
 
  async save(): Promise<void> {
    try {
      const formData = this.form.value;
      const scenarioId = await this.scenarioService.addScenario(formData);
      console.log('Scenario saved successfully with ID:', scenarioId);
      this.payLoad = JSON.stringify(formData);
      alert('Scenario saved successfully!');
      this.form.reset();
    } catch (error) {
      console.error('Error saving scenario:', error);
      alert('Error saving scenario. Please try again.');
    }
  }
}