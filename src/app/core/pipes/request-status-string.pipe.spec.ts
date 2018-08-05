import { RequestStatusStringPipe } from './request-status-string.pipe';

describe('RequestStatusStringPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestStatusStringPipe();
    expect(pipe).toBeTruthy();
  });
});
