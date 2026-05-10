import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Returns a custom validation function that validates an array length is equal or greater
 * to the value specified.
 *
 * @param {number} n The minimum size of the array.
 * @returns A validation function.
 */
export function minArrayLengthValidator(n: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!Array.isArray(value)) {
      return { isArray: true }
    }
    if (value.length < n) {
      return { minArrayLength: true };
    }

    return null;
  }
}

/**
 * Validate that all values in an array are unique.
 *
 * @param {AbstractControl} control The Angular form control object.
 * @returns {ValidationErrors | null} If successful NULL, otherwise a ValidationErrors object.
 */
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
