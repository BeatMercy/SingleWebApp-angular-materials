import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierBoardComponent } from './cashier-board.component';

describe('CashierBoardComponent', () => {
  let component: CashierBoardComponent;
  let fixture: ComponentFixture<CashierBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
