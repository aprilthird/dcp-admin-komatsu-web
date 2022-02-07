import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponentsComponent } from './dialog-components.component';

describe('DialogComponentsComponent', () => {
  let component: DialogComponentsComponent;
  let fixture: ComponentFixture<DialogComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
