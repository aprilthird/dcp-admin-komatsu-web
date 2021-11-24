import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFormatoComponent } from './dialog-add-formato.component';

describe('DialogAddFormatoComponent', () => {
  let component: DialogAddFormatoComponent;
  let fixture: ComponentFixture<DialogAddFormatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFormatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
