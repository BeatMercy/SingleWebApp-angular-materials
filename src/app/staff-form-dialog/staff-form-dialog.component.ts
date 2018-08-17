import { Component, OnInit, Inject } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
@Component({
  selector: 'app-staff-form-dialog',
  templateUrl: './staff-form-dialog.component.html',
  styleUrls: ['./staff-form-dialog.component.css']
})
export class StaffFormDialogComponent implements OnInit {

  authHttp: AuthHttp;
  allDepartments: any;
  createMode: boolean;
  error_msg = '';
  //
  id: number;
  realName: string;
  password: string;
  phone: string;
  weixin: string;
  departmentId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StaffFormDialogComponent>,
    http: Http,
    requestOptions: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {
    this.createMode = this.data['createMode'];
    if (!this.createMode) {
      // editMode
      const staff = this.data['staff'];
      this.realName = staff['realName'];
      this.phone = staff['phone'];
      this.weixin = staff['weixin'];
      this.departmentId = staff['department']['id'];
    }

    this.authHttp.get('mg/departments').pipe(map(rsp => rsp.json()))
      .subscribe(json => {
        this.allDepartments = json;
      });

  }

  submit(mode: string) {
    if (this.realName === '' || this.realName === undefined) {
      this.error_msg = '员工姓名不合法';
      return;
    }
    if (mode === 'add') {
      if (this.password === undefined || this.password.length < 6) {
        this.error_msg = '密码不可少于6位';
        return;
      }
    }
    this.error_msg = '';
    this.authHttp.post(`mg/staff/${mode}`,
      {
        id: this.id ? null : this.id,
        realName: this.realName,
        phone: this.phone,
        password: this.password,
        weixin: this.weixin,
        departmentId: this.departmentId
      })
      .pipe(map(rsp => rsp.json()))
      .subscribe(json => {
        this.dialogRef.close(json);
      }, error => {
        this.dialogRef.close(error);
      });
  }
}
