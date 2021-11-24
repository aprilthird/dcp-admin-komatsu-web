import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEquiposComponent } from './tipo-equipos.component';

describe('TipoEquiposComponent', () => {
  let component: TipoEquiposComponent;
  let fixture: ComponentFixture<TipoEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
