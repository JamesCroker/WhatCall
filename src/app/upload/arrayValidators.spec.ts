import { FormControl } from "@angular/forms";
import * as ArrayValidators from './arrayValidators';

describe('ArrayValidators.minArrayLengthValidator', () => {

  let control: FormControl

  beforeEach(() => {
    control = new FormControl<string[]>([] as string[], [
      ArrayValidators.minArrayLengthValidator(2)
    ])
  });

  it('Should fail if empty', () => {
    control.setValue([])
    expect(control.valid).toBeFalse();
  });

  it('Should fail if less than min size', () => {
    control.setValue(['A'])
    expect(control.valid).toBeFalse();
  });

  it('Should succeed if exactly min size', () => {
    control.setValue(['A', 'B'])
    expect(control.valid).toBeTrue();
  });

  it('Should succeed if greater than min size', () => {
    control.setValue(['A', 'B', 'C'])
    expect(control.valid).toBeTrue();
  });

});


describe('ArrayValidators.arrayNoDuplicatesValidator', () => {

  let control: FormControl

  beforeEach(() => {
    control = new FormControl<string[]>([] as string[], [
      ArrayValidators.arrayNoDuplicatesValidator
    ])
  });

  it('Should succeed if empty', () => {
    control.setValue([])
    expect(control.valid).toBeTrue();
  });

  it('Should succeed if all values unique', () => {
    control.setValue(['A', 'B'])
    expect(control.valid).toBeTrue();
  });

  it('Should fail if values are all the same', () => {
    control.setValue(['A', 'A'])
    expect(control.valid).toBeFalse();
  });

  it('Should fail if any values are dupliated', () => {
    control.setValue(['A', 'B', 'A'])
    expect(control.valid).toBeFalse();
  });


});
