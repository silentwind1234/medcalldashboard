import { Validators, FormControl } from '@angular/forms';

/**
 * An array of data with an associated page object used for paging
 */
export function NumberValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  if (value) {
    if (typeof value === 'number') { return null; }
    const valid = value.match(/^\d+$/);
    return valid ? null : { onlynumber: true };
  }
  return null;
}
