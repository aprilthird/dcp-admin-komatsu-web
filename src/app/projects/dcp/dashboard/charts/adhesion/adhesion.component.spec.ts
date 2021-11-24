import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionComponent } from './adhesion.component';

describe('AdhesionComponent', () => {
  let component: AdhesionComponent;
  let fixture: ComponentFixture<AdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
