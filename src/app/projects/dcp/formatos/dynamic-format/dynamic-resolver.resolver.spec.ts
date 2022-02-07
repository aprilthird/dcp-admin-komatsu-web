import { TestBed } from '@angular/core/testing';

import { DynamicResolverResolver } from './dynamic-resolver.resolver';

describe('DynamicResolverResolver', () => {
  let resolver: DynamicResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DynamicResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
