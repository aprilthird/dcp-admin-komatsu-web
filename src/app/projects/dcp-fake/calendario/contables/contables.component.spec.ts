import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContablesComponent } from './contables.component';

describe('ContablesComponent', () => {
  let component: ContablesComponent;
  let fixture: ComponentFixture<ContablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
