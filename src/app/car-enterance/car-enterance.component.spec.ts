import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEnteranceComponent } from './car-enterance.component';

describe('CarEnteranceComponent', () => {
  let component: CarEnteranceComponent;
  let fixture: ComponentFixture<CarEnteranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEnteranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEnteranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
