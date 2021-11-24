import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletePerfilComponent } from './dialog-delete-perfil.component';

describe('DialogDeletePerfilComponent', () => {
  let component: DialogDeletePerfilComponent;
  let fixture: ComponentFixture<DialogDeletePerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeletePerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeletePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
