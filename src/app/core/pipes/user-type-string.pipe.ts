import { Pipe, PipeTransform } from '@angular/core';
import { UserType } from '../enums/user-type.enum';

@Pipe({
  name: 'userTypeString'
})
export class UserTypeStringPipe implements PipeTransform {

  transform(value: number): any {
    return UserType[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
