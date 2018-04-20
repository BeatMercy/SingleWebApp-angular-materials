import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgStaffComponent } from './mg-staff.component';

describe('MgStaffComponent', () => {
  let component: MgStaffComponent;
  let fixture: ComponentFixture<MgStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
