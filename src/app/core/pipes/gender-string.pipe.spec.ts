import { GenderStringPipe } from './gender-string.pipe';

describe('GenderStringPipe', () => {
  it('create an instance', () => {
    const pipe = new GenderStringPipe();
    expect(pipe).toBeTruthy();
  });
});
