import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffWorkListComponent } from './staff-work-list.component';

describe('StaffWorkListComponent', () => {
  let component: StaffWorkListComponent;
  let fixture: ComponentFixture<StaffWorkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffWorkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
