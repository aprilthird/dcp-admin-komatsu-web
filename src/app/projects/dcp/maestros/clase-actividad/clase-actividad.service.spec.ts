import { TestBed } from '@angular/core/testing';

import { ClaseActividadService } from './clase-actividad.service';

describe('ClaseActividadService', () => {
  let service: ClaseActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
