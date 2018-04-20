import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInfoDialogComponent } from './orders-info-dialog.component';

describe('OrdersInfoDialogComponent', () => {
  let component: OrdersInfoDialogComponent;
  let fixture: ComponentFixture<OrdersInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
