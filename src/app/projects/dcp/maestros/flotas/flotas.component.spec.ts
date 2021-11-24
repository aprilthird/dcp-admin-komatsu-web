import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotasComponent } from './flotas.component';

describe('FlotasComponent', () => {
  let component: FlotasComponent;
  let fixture: ComponentFixture<FlotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
