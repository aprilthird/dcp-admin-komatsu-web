import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFormatoComponent } from './asignar-formato.component';

describe('AsignarFormatoComponent', () => {
  let component: AsignarFormatoComponent;
  let fixture: ComponentFixture<AsignarFormatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarFormatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
