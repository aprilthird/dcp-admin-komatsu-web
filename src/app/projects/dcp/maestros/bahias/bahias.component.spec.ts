import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BahiasComponent } from './bahias.component';

describe('BahiasComponent', () => {
  let component: BahiasComponent;
  let fixture: ComponentFixture<BahiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BahiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BahiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
