import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddGrupoComponent } from './dialog-add-grupo.component';

describe('DialogAddGrupoComponent', () => {
  let component: DialogAddGrupoComponent;
  let fixture: ComponentFixture<DialogAddGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
