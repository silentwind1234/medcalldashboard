import { Validators, FormControl } from '@angular/forms';

/**
 * An array of data with an associated page object used for paging
 */
export function IpValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  if (value) {
    // if (typeof value === 'number') {return null;};
    const valid = value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
    return valid ? null : { onlyip: true };
  }
  return null;
}
