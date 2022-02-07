import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormatComponent } from './dynamic-format.component';

describe('DynamicFormatComponent', () => {
  let component: DynamicFormatComponent;
  let fixture: ComponentFixture<DynamicFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
