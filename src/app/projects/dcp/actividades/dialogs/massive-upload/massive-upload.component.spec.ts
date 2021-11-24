import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveUploadComponent } from './massive-upload.component';

describe('MassiveUploadComponent', () => {
  let component: MassiveUploadComponent;
  let fixture: ComponentFixture<MassiveUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassiveUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassiveUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
