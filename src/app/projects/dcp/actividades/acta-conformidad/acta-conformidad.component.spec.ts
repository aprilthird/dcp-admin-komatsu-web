import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaConformidadComponent } from './acta-conformidad.component';

describe('ActaConformidadComponent', () => {
  let component: ActaConformidadComponent;
  let fixture: ComponentFixture<ActaConformidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActaConformidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaConformidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
