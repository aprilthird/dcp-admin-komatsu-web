import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEquiposComponent } from './dialog-add-equipos.component';

describe('DialogAddEquiposComponent', () => {
  let component: DialogAddEquiposComponent;
  let fixture: ComponentFixture<DialogAddEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
