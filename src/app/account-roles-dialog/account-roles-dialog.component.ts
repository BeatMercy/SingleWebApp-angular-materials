import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange, MatSnackBar } from '@angular/material';
import { Http, RequestOptions } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-account-roles-dialog',
  templateUrl: './account-roles-dialog.component.html',
  styleUrls: ['./account-roles-dialog.component.css']
})
export class AccountRolesDialogComponent implements OnInit {
  authHttp: AuthHttp;
  allRoles: Array<any>;
  staffRoles: Array<any>;
  error_msg = '';
  //

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountRolesDialogComponent>,
    http: Http, public snackBar: MatSnackBar,
    requestOptions: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {
    this.authHttp.get(`mg/staff/roles?staffId=${this.data['id']}`)
      .map(rsp => rsp.json()).subscribe(json => {
        if (json['success']) {
          const content = json['content'];
          this.allRoles = content['all'];
          this.staffRoles = content['staff'];
        } else {
          alert(`失败：${json['msg']}`);
        }
      });
  }

  hasRole(roleId: number): boolean {
    let result = false;
    this.staffRoles.forEach(child => {
      if (child['id'] === roleId) {
        result = true;
      }
    });
    return result;
  }

  changeRole(event: MatCheckboxChange, roleId: number) {
    let action = 'delete';
    if (event.checked) {
      action = 'add';
    }
    this.authHttp.get(`mg/staff/role/${action}?staffId=${this.data['id']}&roleId=${roleId}`)
      .map(rsp => rsp.json()).subscribe(json => {
        if (json['success']) {
          this.snackBar.open('权限添加成功', '', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        } else {
          this.snackBar.open('操作失败', '', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
          event.source.checked = !event.checked;
        }
      }, error => {
        this.snackBar.open('操作失败', '', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
        event.source.checked = !event.checked;
      });
  }
}
