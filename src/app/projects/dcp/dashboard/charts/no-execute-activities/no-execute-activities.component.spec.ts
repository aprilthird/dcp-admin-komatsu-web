import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoExecuteActivitiesComponent } from './no-execute-activities.component';

describe('NoExecuteActivitiesComponent', () => {
  let component: NoExecuteActivitiesComponent;
  let fixture: ComponentFixture<NoExecuteActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoExecuteActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoExecuteActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
