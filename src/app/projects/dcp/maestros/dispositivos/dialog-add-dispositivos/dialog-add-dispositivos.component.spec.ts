import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDispositivosComponent } from './dialog-add-dispositivos.component';

describe('DialogAddDispositivosComponent', () => {
  let component: DialogAddDispositivosComponent;
  let fixture: ComponentFixture<DialogAddDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDispositivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
