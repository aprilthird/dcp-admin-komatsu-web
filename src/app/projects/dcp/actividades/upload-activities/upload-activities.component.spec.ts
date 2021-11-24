import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadActivitiesComponent } from './upload-activities.component';

describe('UploadActivitiesComponent', () => {
  let component: UploadActivitiesComponent;
  let fixture: ComponentFixture<UploadActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
