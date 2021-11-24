import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmmpComponent } from './kmmp.component';

describe('KmmpComponent', () => {
  let component: KmmpComponent;
  let fixture: ComponentFixture<KmmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
