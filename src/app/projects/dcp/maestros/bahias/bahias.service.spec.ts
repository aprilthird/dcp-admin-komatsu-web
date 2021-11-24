import { TestBed } from '@angular/core/testing';

import { BahiasService } from './bahias.service';

describe('BahiasService', () => {
  let service: BahiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BahiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
