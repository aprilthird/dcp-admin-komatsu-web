import { TestBed } from '@angular/core/testing';

import { MenuPermissionGuard } from './menu-permission.guard';

describe('MenuPermissionGuard', () => {
  let guard: MenuPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MenuPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
