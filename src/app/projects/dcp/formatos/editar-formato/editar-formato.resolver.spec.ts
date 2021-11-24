import { TestBed } from '@angular/core/testing';

import { EditarFormatoResolver } from './editar-formato.resolver';

describe('EditarFormatoResolver', () => {
  let resolver: EditarFormatoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditarFormatoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
