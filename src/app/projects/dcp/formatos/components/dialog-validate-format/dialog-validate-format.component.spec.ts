import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogValidateFormatComponent } from './dialog-validate-format.component';

describe('DialogValidateFormatComponent', () => {
  let component: DialogValidateFormatComponent;
  let fixture: ComponentFixture<DialogValidateFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogValidateFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogValidateFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
