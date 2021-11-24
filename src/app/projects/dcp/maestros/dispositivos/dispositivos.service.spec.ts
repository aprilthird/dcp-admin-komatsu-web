import { TestBed } from '@angular/core/testing';

import { DispositivosService } from './dispositivos.service';

describe('DispositivosService', () => {
  let service: DispositivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispositivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
