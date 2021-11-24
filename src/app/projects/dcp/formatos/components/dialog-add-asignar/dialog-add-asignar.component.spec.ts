import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAsignarComponent } from './dialog-add-asignar.component';

describe('DialogAddAsignarComponent', () => {
  let component: DialogAddAsignarComponent;
  let fixture: ComponentFixture<DialogAddAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAsignarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
