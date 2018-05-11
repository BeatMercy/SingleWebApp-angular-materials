import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgOrderComponent } from './mg-order.component';

describe('MgOrderComponent', () => {
  let component: MgOrderComponent;
  let fixture: ComponentFixture<MgOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
