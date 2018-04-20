import { Component, OnInit, Inject } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
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

  //
  realName: string;
  phone: string;
  weixin: string;
  departmentId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    http: Http,
    requestOptions: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {
    this.createMode = this.data['createMode'];
    if (!this.createMode) {
      // editMode
      this.realName = this.data['realName'];
      this.phone = this.data['phone'];
      this.weixin = this.data['weixin'];
      this.departmentId = this.data['department']['id'];
    }

    this.authHttp.get('mg/departments').map(rsp => rsp.json())
      .subscribe(json => {
        this.allDepartments = json;
      });

  }

}
