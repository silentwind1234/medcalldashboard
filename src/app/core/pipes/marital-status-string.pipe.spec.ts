import { MaritalStatusStringPipe } from './marital-status-string.pipe';

describe('MaritalStatusStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MaritalStatusStringPipe();
    expect(pipe).toBeTruthy();
  });
});
