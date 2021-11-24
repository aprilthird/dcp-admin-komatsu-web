import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTipoMtmtoComponent } from './dialog-add-tipo-mtmto.component';

describe('DialogAddTipoMtmtoComponent', () => {
  let component: DialogAddTipoMtmtoComponent;
  let fixture: ComponentFixture<DialogAddTipoMtmtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTipoMtmtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTipoMtmtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
