import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleyedCodeComponent } from './deleyed-code.component';

describe('DeleyedCodeComponent', () => {
  let component: DeleyedCodeComponent;
  let fixture: ComponentFixture<DeleyedCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleyedCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleyedCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
