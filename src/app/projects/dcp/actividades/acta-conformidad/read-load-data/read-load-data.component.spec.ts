import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLoadDataComponent } from './read-load-data.component';

describe('ReadLoadDataComponent', () => {
  let component: ReadLoadDataComponent;
  let fixture: ComponentFixture<ReadLoadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadLoadDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadLoadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
