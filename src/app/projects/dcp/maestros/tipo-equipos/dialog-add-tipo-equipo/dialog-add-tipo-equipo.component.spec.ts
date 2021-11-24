import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTipoEquipoComponent } from './dialog-add-tipo-equipo.component';

describe('DialogAddTipoEquipoComponent', () => {
  let component: DialogAddTipoEquipoComponent;
  let fixture: ComponentFixture<DialogAddTipoEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTipoEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTipoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
