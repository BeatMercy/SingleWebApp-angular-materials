import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgUserComponent } from './mg-user.component';

describe('MgUserComponent', () => {
  let component: MgUserComponent;
  let fixture: ComponentFixture<MgUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
