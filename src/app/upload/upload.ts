import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ScenarioService, StorageService } from '../../services';
import { Scenario } from '../../types';
import { ENTER, COMMA, SEMICOLON } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import * as ArrayValidators from './arrayValidators';
import { Auth } from '@angular/fire/auth';

/**
 * Component to upload a new scenario.
 *
 * Presented as a wizard, with a number of steps to capture video URL, title, and options.
 * Intended to be displayed as a modal (launched by uploadModal)
 */
@Component({
  standalone: true,
  selector: 'app-upload',
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule
  ],
})
export class UploadComponent {

  /** Reference to fileInput HTML element */
  @ViewChild('fileInput') fileInputElem!: ElementRef<HTMLInputElement>;

  /** Reference to MatDialog */
  private readonly dialogRef = inject(MatDialogRef<UploadComponent>);

  /** List of key codes to treat as separate options */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON]; // Enter, comma

  /** array of entered options (Signal wrapped)  - presented onscreen as MatChips */
  readonly reactiveKeywords = signal<string[]>([]);

  /** FormGroup for first page - contains form controls */
  firstFormGroup = new FormGroup({
    upload: new FormControl<string>('1'),
    url: new FormControl<string>(''),
  });

  /** FormGroup for second page - contains form controls */
  secondFormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    scenarioType: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
  });

  /** FormGroup for third page - contains form contols */
  thirdFormGroup = new FormGroup({
    options: new FormControl<string[]>([] as string[], [
      Validators.required,
      ArrayValidators.minArrayLengthValidator(2),
      ArrayValidators.arrayNoDuplicatesValidator
    ])
  });

  constructor(
    /** injected ScenarioService service */
    private scenarioService: ScenarioService,
    /** injected StorageService service */
    private storageService: StorageService,
    /** injected Angular/Fire Auth service */
    private auth: Auth
  ) {
    // Empty constructor
  }

  /**
   * Remove an option from the list
   *
   * @param keyword option to remove
   */
  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      return [...keywords];
    });

    this.thirdFormGroup.controls['options'].setValue(this.reactiveKeywords());
  }

  /**
   * Add an option to the list
   *
   * @param event input event recieved from MatChip
   */
  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      console.log('Adding keyword', value);
      this.reactiveKeywords.update(keywords => [...keywords, value]);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.thirdFormGroup.controls['options'].setValue(this.reactiveKeywords());
  }

  get optionsArray(): FormArray {
    return this.thirdFormGroup.get('options') as FormArray;
  }

  /**
   * Create a new scenario, saving the form contents.
   *
   * If a file has been provided, upload this to the storage service and use the public URL of the
   * storage item as the URL.
   */
  async save(): Promise<void> {

    // If a file has been added via the file input, select the first file added.
    const file = (this.fileInputElem.nativeElement.files !== null)
      ? this.fileInputElem.nativeElement.files[0]
      : undefined;

    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      throw new Error('User not logged in');
    }

    // If a file has been added to the file control upload the file using a time-based ID and
    // use the public URL returned as the URL of the scenario.
    let fileUrl = this.firstFormGroup.value.url;
    if (file !== undefined) {
      const fileId = (new Date()).toISOString()
      fileUrl = await this.storageService.upload(uid, fileId, file);
    }

    try {

      // Create a scenario object, ready to save
      const formData: Omit<Scenario, 'id'> = {
        url: fileUrl || '',
        options: this.thirdFormGroup.value.options || [],
        scenarioType: this.secondFormGroup.value.scenarioType || '',
        title: this.secondFormGroup.value.title || '',
        uid: this.auth.currentUser?.uid || ''
      };

      // Save the scenario in Firestore using the scenarioService.
      const scenarioId = await this.scenarioService.addScenario(formData);
      console.log('Scenario saved successfully with ID:', scenarioId);

      this.dialogRef.close();

    } catch (error) {
      console.error('Error saving scenario:', error);
      alert('Error saving scenario. Please try again.');
    }
  }

}
