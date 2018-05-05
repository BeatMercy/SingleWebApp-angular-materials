import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { MessageDialogService } from '../message-dialog.service';
import { RequestOptions, Http } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { AuthHttp } from 'angular2-jwt';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-car-repair-order-submit',
  templateUrl: './car-repair-order-submit.component.html',
  styleUrls: ['./car-repair-order-submit.component.css']
})
export class CarRepairOrderSubmitComponent implements OnInit {
  provinceAbbr = [
    { value: '粤', viewValue: '粤' },
    { value: '赣', viewValue: '赣' },
    { value: '湘', viewValue: '湘' },
    { value: '京', viewValue: '京' },
    { value: '冀', viewValue: '冀' },
    { value: '苏', viewValue: '苏' },
    { value: '豫', viewValue: '豫' },
    { value: '辽', viewValue: '辽' },
    { value: '黑', viewValue: '黑' },
    { value: '皖', viewValue: '皖' },
    { value: '新', viewValue: '新' },
    { value: '鄂', viewValue: '鄂' },
    { value: '晋', viewValue: '晋' },
    { value: '陕', viewValue: '陕' },
    { value: '吉', viewValue: '吉' },
    { value: '青', viewValue: '青' },
    { value: '甘', viewValue: '甘' },
    { value: '贵', viewValue: '贵' },
    { value: '浙', viewValue: '浙' },
    { value: '鲁', viewValue: '鲁' },
    { value: '蒙', viewValue: '蒙' },
    { value: '藏', viewValue: '藏' },
    { value: '闽', viewValue: '闽' },
    { value: '川', viewValue: '川' },
    { value: '琼', viewValue: '琼' },
    { value: '云', viewValue: '云' }
  ];

  // 文件
  public uploader: FileUploader;
  private authHttp: AuthHttp;

  plateString = '';
  plateAbbr = '粤';
  basePrice = 0.00;
  engineNo: string;  // 发动机号
  chassisNo: string; // 底盘号
  travelMiles = 0;
  note = '';


  private items = new Array<number>();
  private repairItems = new Array<object>();


  constructor(private router: Router,
    private messageService: MessageDialogService,
    private http: Http, requestOption: RequestOptions
  ) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
    this.uploader = new FileUploader({
      url: '/plate-recognize/car/full',
      authToken: localStorage.getItem('token')
    });
  }

  ngOnInit() {
  }

  onChangeMiles(event: MatSliderChange) {
    this.travelMiles = event.value;
  }

  addRepairItem() {
    this.repairItems.push({
      itemName: '',
      price: 0.00
    });
  }
  removeRepairItem(i: number) {
    const start = this.repairItems.slice(0, i);
    const end = this.repairItems.slice(i + 1, this.repairItems.length);
    this.repairItems = start.concat(end);
    // this.repairItems = this.repairItems.slice(i, i + 1);
  }

  sumUp(): number {
    let sum = 0;
    this.repairItems.forEach(element => {
      sum = +element['price'];
    });
    return sum;
  }
}
