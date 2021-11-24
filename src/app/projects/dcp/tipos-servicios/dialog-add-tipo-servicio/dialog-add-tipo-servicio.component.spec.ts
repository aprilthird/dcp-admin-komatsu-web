import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTipoServicioComponent } from './dialog-add-tipo-servicio.component';

describe('DialogAddTipoServicioComponent', () => {
  let component: DialogAddTipoServicioComponent;
  let fixture: ComponentFixture<DialogAddTipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTipoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
