import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSelectionComponent } from './other-selection.component';

describe('OtherSelectionComponent', () => {
  let component: OtherSelectionComponent;
  let fixture: ComponentFixture<OtherSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
