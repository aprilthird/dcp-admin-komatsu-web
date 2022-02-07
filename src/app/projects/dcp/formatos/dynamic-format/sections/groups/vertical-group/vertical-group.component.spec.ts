import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGroupComponent } from './vertical-group.component';

describe('VerticalGroupComponent', () => {
  let component: VerticalGroupComponent;
  let fixture: ComponentFixture<VerticalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
