import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoExecuteActivitiesSingleComponent } from './no-execute-activities-single.component';

describe('NoExecuteActivitiesSingleComponent', () => {
  let component: NoExecuteActivitiesSingleComponent;
  let fixture: ComponentFixture<NoExecuteActivitiesSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoExecuteActivitiesSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoExecuteActivitiesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
