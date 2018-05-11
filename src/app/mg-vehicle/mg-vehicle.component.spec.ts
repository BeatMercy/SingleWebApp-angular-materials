import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgVehicleComponent } from './mg-vehicle.component';

describe('MgVehicleComponent', () => {
  let component: MgVehicleComponent;
  let fixture: ComponentFixture<MgVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
