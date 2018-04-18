import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgServiceOptionComponent } from './mg-service-option.component';

describe('MgServiceOptionComponent', () => {
  let component: MgServiceOptionComponent;
  let fixture: ComponentFixture<MgServiceOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgServiceOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgServiceOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
