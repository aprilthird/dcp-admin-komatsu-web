import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsSelectionComponent } from './chips-selection.component';

describe('ChipsSelectionComponent', () => {
  let component: ChipsSelectionComponent;
  let fixture: ComponentFixture<ChipsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
