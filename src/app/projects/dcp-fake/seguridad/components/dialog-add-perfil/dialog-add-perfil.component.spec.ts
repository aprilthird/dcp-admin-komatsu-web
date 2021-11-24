import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPerfilComponent } from './dialog-add-perfil.component';

describe('DialogAddPerfilComponent', () => {
  let component: DialogAddPerfilComponent;
  let fixture: ComponentFixture<DialogAddPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
