import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ProfileService, Scenario, ScenarioService, StorageService } from '../../services';
import { ENTER, COMMA, SEMICOLON } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import * as ArrayValidators from './arrayValidators';

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

  @ViewChild('fileInput') fileInputElem!: ElementRef<HTMLInputElement>;

  private readonly dialogRef = inject(MatDialogRef<UploadComponent>);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON]; // Enter, comma
  readonly reactiveKeywords = signal<string[]>([]);

  firstFormGroup = new FormGroup({
    upload: new FormControl<string>('1'),
    url: new FormControl<string>(''),
  });
  secondFormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    scenarioType: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
  });
  thirdFormGroup = new FormGroup({
    options: new FormControl<string[]>([] as string[], [
      Validators.required,
      ArrayValidators.minArrayLengthValidator(2),
      ArrayValidators.arrayNoDuplicatesValidator
    ])
  });

  constructor(
    private profileService: ProfileService,
    private scenarioService: ScenarioService,
    private storageService: StorageService
  ) { }

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

  /*
  PSEUDO CODE:
  if (the user is not logged in) {
    throw an error and exit.
  }

  if (the user has entered a URL) {
    URL = the URL entered by the user
  } else {
    upload the first file selected to Firebase Storage using a unique identifier (e.g., timestamp or UUID)
    make the file publicly accessible and get the URL
  }
  
  create a database document based on the input from the user and the URL obtained above, including:
  - title
  - description
  - scenario type
  - options (array of strings)
  - URL (from above)
  - UID of the user

  save the document to Firestore under a "scenarios" collection with an auto-generated ID

  if (save is successful) {
    close the upload dialog
  }  else {
    display an error message to the user
  }
    
  */
  async save(): Promise<void> {

    const file = (this.fileInputElem.nativeElement.files !== null)
      ? this.fileInputElem.nativeElement.files[0]
      : undefined;

    const uid = this.profileService.getUid();
    if (!uid) {
      throw new Error('User not logged in');
    }

    let fileUrl = this.firstFormGroup.value.url;
    if (file !== undefined) {
      const fileId = (new Date()).toISOString()
      fileUrl = await this.storageService.upload(uid, fileId, file);
    }

    try {
      const formData: Omit<Scenario, 'id'> = {
        url: fileUrl || '',
        options: this.thirdFormGroup.value.options || [],
        scenarioType: this.secondFormGroup.value.scenarioType || '',
        title: this.secondFormGroup.value.title || '',
        uid: this.profileService.getUid() || ''
      };

      const scenarioId = await this.scenarioService.addScenario(formData);
      console.log('Scenario saved successfully with ID:', scenarioId);

      this.dialogRef.close();

    } catch (error) {
      console.error('Error saving scenario:', error);
      alert('Error saving scenario. Please try again.');
    }
  }

}