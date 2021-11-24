import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFlotaComponent } from './status-flota.component';

describe('StatusFlotaComponent', () => {
  let component: StatusFlotaComponent;
  let fixture: ComponentFixture<StatusFlotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusFlotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFlotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
