import { TestBed } from '@angular/core/testing';

import { EmailResolver } from './email.resolver';

describe('EmailResolver', () => {
  let resolver: EmailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
