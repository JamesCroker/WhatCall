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
    title: new FormControl(''),
    scenarioType: new FormControl(''),
    description: new FormControl(''),
    url: new FormControl(''),
    options: new FormArray([])
  });
  payLoad: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private scenarioService: ScenarioService
  ) {}

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

  isFormValid(): boolean {
    const optionsArray = this.form.get('options') as FormArray;
    return this.form.valid && optionsArray.length > 0;
  }

  get optionsArray(): FormArray {
    return this.form.get('options') as FormArray;
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) {
      console.error('Form is invalid');
      alert('Please fill in all required fields and add at least one answer option');
      return;
    }

    try {
      const formData = this.form.value;
      const scenarioId = await this.scenarioService.addScenario(formData);
      console.log('Scenario saved successfully with ID:', scenarioId);
      this.payLoad = JSON.stringify(formData);
      alert('Scenario saved successfully!');
      // Optional: Reset form or navigate away
      this.form.reset();
    } catch (error) {
      console.error('Error saving scenario:', error);
      alert('Error saving scenario. Please try again.');
    }
  }
}