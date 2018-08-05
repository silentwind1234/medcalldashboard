import { ProvidersModule } from './providers.module';

describe('ProvidersModule', () => {
  let providersModule: ProvidersModule;

  beforeEach(() => {
    providersModule = new ProvidersModule();
  });

  it('should create an instance', () => {
    expect(providersModule).toBeTruthy();
  });
});
