import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBahiasComponent } from './dialog-add-bahias.component';

describe('DialogAddBahiasComponent', () => {
  let component: DialogAddBahiasComponent;
  let fixture: ComponentFixture<DialogAddBahiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBahiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBahiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
