import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../enums/gender.enum';

@Pipe({
  name: 'genderString'
})
export class GenderStringPipe implements PipeTransform {

  transform(value: number): any {
    return Gender[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
