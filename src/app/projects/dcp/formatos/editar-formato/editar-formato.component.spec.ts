import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormatoComponent } from './editar-formato.component';

describe('EditarFormatoComponent', () => {
  let component: EditarFormatoComponent;
  let fixture: ComponentFixture<EditarFormatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFormatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
