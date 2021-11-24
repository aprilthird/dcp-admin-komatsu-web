import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaAsignacionComponent } from './apertura-asignacion.component';

describe('AperturaAsignacionComponent', () => {
  let component: AperturaAsignacionComponent;
  let fixture: ComponentFixture<AperturaAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturaAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturaAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
