import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLaboralesComponent } from './no-laborales.component';

describe('NoLaboralesComponent', () => {
  let component: NoLaboralesComponent;
  let fixture: ComponentFixture<NoLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoLaboralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
