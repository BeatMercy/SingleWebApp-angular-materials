import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { MessageDialogService } from '../message-dialog.service';
import { RequestOptions, Http } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { AuthHttp } from 'angular2-jwt';
import { MatSliderChange } from '@angular/material';
import { provinceAbbr } from '../entity/const';

@Component({
  selector: 'app-car-repair-order-submit',
  templateUrl: './car-repair-order-submit.component.html',
  styleUrls: ['./car-repair-order-submit.component.css']
})
export class CarRepairOrderSubmitComponent implements OnInit {
  provinceAbbr = provinceAbbr;

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

  public isLoading: boolean;

  private items = new Array<number>();
  public repairItems = new Array<object>();


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

  /**
   * 上传车牌图片并识别
   */
  addFile() {
    // TODO 压缩图片
    // .....
    console.log(this.uploader.queue[0]);
    this.isLoading = true;
    this.uploader.queue[0].upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      if (result['success']) {
        const content = result['content'];
        this.plateAbbr = content['plateAbbr'];
        this.plateString = content['plateString'];
        if (content['info'] !== null) {
          this.engineNo = content['info']['engineNo'] || '';
          this.chassisNo = content['info']['chassisNo'] || '';
        } else {
          this.engineNo = '';
          this.chassisNo = '';
        }
      } else {
        this.messageService.showMessage('发生错误', result['msg']);
      }
      // 完成上传
      this.uploader.clearQueue();
      this.uploader.response.observers.shift();
      this.uploader.isUploading = false;
      // as reason of TS is a typesafe lanuage. operater value before type convertion;
      (<HTMLInputElement>document.getElementById('carPic')).value = '';
      this.isLoading = false;
    }, error => {
      this.uploader.clearQueue();
      this.messageService.showMessage('发生错误', error);
      this.isLoading = false;
    }, () => {
      console.log('完成车牌图片上传');
    });
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
    sum += this.basePrice;
    this.repairItems.forEach(element => {
      sum += element['price'];
    });
    return sum;
  }
  submit() {
    if (this.plateString === '' || this.plateAbbr === '') {
      this.messageService.showMessage('订单数据有误', '车牌号未填写');
      return;
    }
    if (this.engineNo === '' || this.chassisNo === '') {
      this.messageService.showMessage('订单数据有误', '发动机号/底盘号未填写');
      return;
    }
    for (const item in this.repairItems) {
      if (item['itemName'] === '') {
        this.messageService.showMessage('订单数据有误', '维修项目名有空缺');
        return;
      }
    }
    const plateNo = this.plateAbbr + this.plateString;

    this.authHttp.post(
      `/order/repair/submit`,
      {
        'orderDto': {
          plateNo: plateNo,
          chassisNo: this.chassisNo,
          basePrice: this.basePrice,
          engineNo: this.engineNo,
          travelMiles: this.travelMiles,
          note: this.note
        },
        optionDto: this.repairItems,
      }
    ).subscribe(
      next => {
        const json = next.json();
        if (json['success']) {
          console.log(json);
        } else {
          this.messageService.showMessage('订单创建失败', json['msg']);
        }
      },
      error => {
        this.messageService.showMessage('订单创建失败', error['msg']);
      }
    );
  }
}
