import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseActividadComponent } from './clase-actividad.component';

describe('ClaseActividadComponent', () => {
  let component: ClaseActividadComponent;
  let fixture: ComponentFixture<ClaseActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
