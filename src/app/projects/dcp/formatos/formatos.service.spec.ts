import { TestBed } from '@angular/core/testing';

import { FormatosService } from './formatos.service';

describe('FormatosService', () => {
  let service: FormatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
