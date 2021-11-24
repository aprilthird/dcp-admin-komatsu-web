import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDocumentosComponent } from './dialog-add-documentos.component';

describe('DialogAddDocumentosComponent', () => {
  let component: DialogAddDocumentosComponent;
  let fixture: ComponentFixture<DialogAddDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
