import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRepairOrderSubmitComponent } from './car-repair-order-submit.component';

describe('CarRepairOrderSubmitComponent', () => {
  let component: CarRepairOrderSubmitComponent;
  let fixture: ComponentFixture<CarRepairOrderSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRepairOrderSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRepairOrderSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
