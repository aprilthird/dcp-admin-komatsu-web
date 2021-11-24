import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFlotasComponent } from './dialog-add-flotas.component';

describe('DialogAddFlotasComponent', () => {
  let component: DialogAddFlotasComponent;
  let fixture: ComponentFixture<DialogAddFlotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFlotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFlotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
