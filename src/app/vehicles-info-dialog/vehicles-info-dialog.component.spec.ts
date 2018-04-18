import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesInfoDialogComponent } from './vehicles-info-dialog.component';

describe('VehiclesInfoDialogComponent', () => {
  let component: VehiclesInfoDialogComponent;
  let fixture: ComponentFixture<VehiclesInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
