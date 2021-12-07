import { TestBed } from '@angular/core/testing';

import { TiposServiciosService } from './tipos-servicios.service';

describe('TiposServiciosService', () => {
  let service: TiposServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
