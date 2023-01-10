import { TestBed } from '@angular/core/testing';

import { TabResolver } from './tab.resolver';

describe('TabResolver', () => {
  let resolver: TabResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TabResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
