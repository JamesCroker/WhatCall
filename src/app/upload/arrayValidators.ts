import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace ArrayValidators {

  export function minArrayLengthValidator(n: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!Array.isArray(value)) {
        return { isArray: true }
      }
      if (value.length < n) {
        return { minArrayLengthIs2: true };
      }


      return null;
    }
  }

  export function arrayNoDuplicatesValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!Array.isArray(value)) {
      return { isArray: true }
    }

    const uniqueValues = new Set(value);
    if (uniqueValues.size !== value.length) {
      return { arrayNoDuplicates: true };
    }

    return null

  }

}