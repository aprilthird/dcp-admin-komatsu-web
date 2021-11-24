import { TestBed } from '@angular/core/testing';

import { TipoEquiposService } from './tipo-equipos.service';

describe('TipoEquiposService', () => {
  let service: TipoEquiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEquiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
