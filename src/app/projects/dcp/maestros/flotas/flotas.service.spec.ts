import { TestBed } from '@angular/core/testing';

import { FlotasService } from './flotas.service';

describe('FlotasService', () => {
  let service: FlotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
