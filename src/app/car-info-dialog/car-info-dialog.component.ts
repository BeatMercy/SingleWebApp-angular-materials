import { Component, OnInit, Inject } from '@angular/core';
import { VEHICLE_BRAND, provinceAbbr, FUSE_TYPE, VEHICLE_TYPE } from '../entity/const';
import { AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { authHttpServiceFactory } from '../../auth.module';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessageDialogService } from '../message-dialog.service';

@Component({
  selector: 'app-car-info-dialog',
  templateUrl: './car-info-dialog.component.html',
  styleUrls: ['./car-info-dialog.component.css'],
})
export class CarInfoDialogComponent implements OnInit {
  authHttp: AuthHttp;

  // 【自动填写】信息
  provinceAbbr = provinceAbbr;
  vehicleBrand = VEHICLE_BRAND;
  vehicleFuseType = FUSE_TYPE;
  vehicleType = VEHICLE_TYPE;

  operation = 'bind';

  plateAbbr = '粤';
  plateString: string;
  engineNo: string;
  chassisNo: string;
  carBrand: string;
  fuseType: string;
  carType: string;
  broughtDate: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CarInfoDialogComponent>,
    private messageService: MessageDialogService,
    http: Http,
    requestOptions: RequestOptions
  ) {
    if (!!data) {
      const plateNo = (<string>data['plateNo']);
      this.plateAbbr = plateNo.substring(0, 1);
      this.plateString = plateNo.substring(1, plateNo.length);
      this.broughtDate = new Date(data['broughtDate']);

      this.engineNo = data['engineNo'];
      this.chassisNo = data['chassisNo'];
      this.carType = data['carType'];
      this.fuseType = data['fuseType'];
      this.carBrand = data['brand'];
      this.operation = 'edit';
    }
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {

  }
  submit() {
    const plateNo = this.plateAbbr + this.plateString;
    this.authHttp.post(
      `/me/vehicle/${this.operation}`
      , {
        id: this.data === null ? null : this.data['id'],
        brand: this.carBrand,
        chassisNo: this.chassisNo,
        engineNo: this.engineNo,
        vehicleType: this.carType,
        plateNo: plateNo.toUpperCase(),
        fuseType: this.fuseType,
        broughtDate: this.broughtDate.getTime() || null
      }).subscribe(
        next => {
          const json = next.json();
          if (json['success']) {
            this.messageService.showMessage('绑定成功', '');
            this.dialogRef.close(json);
          } else {
            this.messageService.showMessage('绑定失败', json['msg']);
          }
        },
        error => this.messageService.showMessage('绑定失败', error['message'])
      );
  }
}
