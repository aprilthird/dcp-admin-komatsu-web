import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrevisualizarComponent } from './dialog-previsualizar.component';

describe('DialogPrevisualizarComponent', () => {
  let component: DialogPrevisualizarComponent;
  let fixture: ComponentFixture<DialogPrevisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrevisualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPrevisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
