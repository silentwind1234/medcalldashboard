import { Pipe, PipeTransform } from '@angular/core';
import { ProviderType } from '../enums/provider-type.enum';

@Pipe({
  name: 'providerTypeString'
})
export class ProviderTypeStringPipe implements PipeTransform {

  transform(value: number): any {
    return ProviderType[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
