import { PaymentMethodStringPipe } from './payment-method-string.pipe';

describe('PaymentMethodStringPipe', () => {
  it('create an instance', () => {
    const pipe = new PaymentMethodStringPipe();
    expect(pipe).toBeTruthy();
  });
});
