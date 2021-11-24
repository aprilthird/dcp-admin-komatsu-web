import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFlotaSingleComponent } from './status-flota-single.component';

describe('StatusFlotaSingleComponent', () => {
  let component: StatusFlotaSingleComponent;
  let fixture: ComponentFixture<StatusFlotaSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusFlotaSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFlotaSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
