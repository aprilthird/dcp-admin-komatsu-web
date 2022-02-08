import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagableFieldsComponent } from './managable-fields.component';

describe('ManagableFieldsComponent', () => {
  let component: ManagableFieldsComponent;
  let fixture: ComponentFixture<ManagableFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagableFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagableFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
