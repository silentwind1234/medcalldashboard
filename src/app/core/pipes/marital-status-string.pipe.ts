import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatus } from '../enums/marital-status.enum';

@Pipe({
  name: 'maritalStatusString'
})
export class MaritalStatusStringPipe implements PipeTransform {

  transform(value: number): any {
    return MaritalStatus[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
