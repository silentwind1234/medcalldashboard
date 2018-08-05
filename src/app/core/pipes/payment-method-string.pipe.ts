import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '../enums/payment-method.enum';

@Pipe({
  name: 'paymentMethodString'
})
export class PaymentMethodStringPipe implements PipeTransform {

  transform(value: number): any {
    return PaymentMethod[value].split(/(?=[A-Z])/).join().replace(',', ' ');
  }

}
