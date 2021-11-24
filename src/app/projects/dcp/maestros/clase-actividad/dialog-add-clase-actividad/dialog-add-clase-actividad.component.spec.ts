import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddClaseActividadComponent } from './dialog-add-clase-actividad.component';

describe('DialogAddClaseActividadComponent', () => {
  let component: DialogAddClaseActividadComponent;
  let fixture: ComponentFixture<DialogAddClaseActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddClaseActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddClaseActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
