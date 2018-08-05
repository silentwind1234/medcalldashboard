import { UserTypeStringPipe } from './user-type-string.pipe';

describe('UserTypeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UserTypeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
