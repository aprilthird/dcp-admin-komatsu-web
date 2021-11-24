import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddModelosComponent } from './dialog-add-modelos.component';

describe('DialogAddModelosComponent', () => {
  let component: DialogAddModelosComponent;
  let fixture: ComponentFixture<DialogAddModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddModelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
