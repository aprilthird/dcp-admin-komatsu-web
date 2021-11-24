import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpComponent } from './dcp.component';

describe('DcpComponent', () => {
  let component: DcpComponent;
  let fixture: ComponentFixture<DcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
