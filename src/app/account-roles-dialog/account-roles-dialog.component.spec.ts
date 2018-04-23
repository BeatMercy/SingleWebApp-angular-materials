import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRolesDialogComponent } from './account-roles-dialog.component';

describe('AccountRolesDialogComponent', () => {
  let component: AccountRolesDialogComponent;
  let fixture: ComponentFixture<AccountRolesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRolesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
