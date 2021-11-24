import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSeccionComponent } from './dialog-add-seccion.component';

describe('DialogAddSeccionComponent', () => {
  let component: DialogAddSeccionComponent;
  let fixture: ComponentFixture<DialogAddSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
