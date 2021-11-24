import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFormatosComponent } from './validation-formatos.component';

describe('ValidationFormatosComponent', () => {
  let component: ValidationFormatosComponent;
  let fixture: ComponentFixture<ValidationFormatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationFormatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
