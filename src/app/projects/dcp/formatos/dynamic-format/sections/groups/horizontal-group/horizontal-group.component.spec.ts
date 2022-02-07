import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGroupComponent } from './horizontal-group.component';

describe('HorizontalGroupComponent', () => {
  let component: HorizontalGroupComponent;
  let fixture: ComponentFixture<HorizontalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
