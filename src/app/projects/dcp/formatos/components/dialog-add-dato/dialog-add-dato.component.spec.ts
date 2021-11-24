import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDatoComponent } from './dialog-add-dato.component';

describe('DialogAddDatoComponent', () => {
  let component: DialogAddDatoComponent;
  let fixture: ComponentFixture<DialogAddDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
