import { TestBed } from '@angular/core/testing';

import { EmailResolverResolver } from './email.resolver.resolver';

describe('EmailResolverResolver', () => {
  let resolver: EmailResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmailResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
