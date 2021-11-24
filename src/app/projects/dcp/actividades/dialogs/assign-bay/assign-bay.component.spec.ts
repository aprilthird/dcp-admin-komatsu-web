import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBayComponent } from './assign-bay.component';

describe('AssignBayComponent', () => {
  let component: AssignBayComponent;
  let fixture: ComponentFixture<AssignBayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
