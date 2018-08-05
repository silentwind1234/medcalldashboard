import { Pipe, PipeTransform } from '@angular/core';
import { RequestStatus } from '../enums/request-status.enum';

@Pipe({
  name: 'requestStatusString'
})
export class RequestStatusStringPipe implements PipeTransform {

  transform(value: number): any {
    return RequestStatus[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
