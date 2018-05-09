import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange, MatSliderChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { MessageDialogService } from '../message-dialog.service';
import { ServiceOption, mapServiceOption, OptionDetail } from '../entity/service-option';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mapTo, filter, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { provinceAbbr } from '../entity/const';


@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.css']
})
export class OrderSubmitComponent implements OnInit, OnDestroy {

  provinceAbbr = provinceAbbr;

  // 文件
  public uploader: FileUploader;

  // 此处的值是mat option的value 而不是viewValue
  selectedService = 'CarBeautifyOrder';
  selectedOption = new Array<ServiceOption>();
  selectedOptions = new Array<object>();
  plateString = '';
  plateAbbr = '粤';
  basePrice = 0.00;
  serviceOption: Observable<ServiceOption[]>;
  travelMiles = 0;
  note = '';

  serviceItem = new Array<object>();
  private authHttp: AuthHttp;
  constructor(
    private router: Router,
    private messageService: MessageDialogService,
    private http: Http, requestOption: RequestOptions
  ) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
    this.uploader = new FileUploader({
      url: '/plate-recognize/order',
      authToken: localStorage.getItem('token')
    });

  }

  ngOnInit() {
    // console.log('此时执行创建方法:');
    this.updateServiceOption();
  }
  ngOnDestroy() {
    // 在切换component时会执行销毁方法
    // console.log('此时执行销毁方法');
  }

  updateServiceOption() {
    this.authHttp.get('/serviceOption/' + this.selectedService + '/all').subscribe(data => {
      // TODO 刷新服务选项
      const array: ServiceOption[] = data.json();
      this.serviceOption = mapServiceOption(array);
      this.serviceOption.map(options => options.length).subscribe(
        value => {
          this.selectedOption = new Array<ServiceOption>(value);
        }
      );
      // console.log(this.serviceOption);
    }, error => {
      this.messageService.showMessage('发生错误', error);
    }, () => { });
  }

  /**
    * 上传车牌图片并识别
    */
  addFile() {
    // TODO 压缩图片
    // .....
    console.log(this.uploader.queue[0]);
    this.uploader.queue[0].upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      if (result['success']) {
        this.plateAbbr = result['content']['plateAbbr'];
        this.plateString = result['content']['plateString'];
      } else {
        this.messageService.showMessage('发生错误', result['msg']);
      }
      // 完成上传
      this.uploader.clearQueue();
      this.uploader.response.observers.shift();
      this.uploader.isUploading = false;
      // as reason of TS is a typesafe lanuage. operater value before type convertion;
      (<HTMLInputElement>document.getElementById('carPic')).value = '';

    }, error => {
      this.uploader.clearQueue();
      this.messageService.showMessage('发生错误', error);
      (<HTMLInputElement>document.getElementById('carPic')).value = '';
    }, () => {
      console.log('完成车牌图片上传');
    });
  }
  addItem() {
    this.serviceItem.push({ name: '', value: '' });
  }
  removeItem(i: number) {
    const start = this.serviceItem.slice(0, i);
    const end = this.serviceItem.slice(i + 1, this.serviceItem.length);
    this.serviceItem = start.concat(end);
  }
  getOptionDetailItem(value: string): Observable<OptionDetail[]> {
    if (value === '') {
      return of(new Array<ServiceOption>());
    }
    return this.serviceOption.switchMap(array => {
      return array.filter(e => e.name === value).map(e => e.options);
    });
  }
  selectUpdate(event: MatSelectChange, name: string) {
    const valueSet: string[] = (<string>event.value).split('-', 2);
    const itemName = valueSet[0];
    const price = valueSet[1];
    this.selectedOptions.push({ itemName: itemName, name: name, price: price });
  }
  updateSelectedOption(event: MatSelectChange) {
    const valueSet: string[] = (<string>event.value).split('-', 2);
    const pos = Number.parseInt(valueSet[0], 10);

    this.serviceOption.subscribe(array => {
      for (let index = 0; index < array.length; index++) {
        const oD = array[index].options.filter(option => option.itemName === valueSet[1]);
        if (oD.length > 0) {
          const item = new ServiceOption();
          item.optionType = array[index].optionType;
          item.itemName = oD[0].itemName;
          item.price = oD[0].price;
          this.selectedOption[pos] = item;
          return;
        } else if (valueSet[1] === 'default') {
          const item = new ServiceOption();
          item.optionType = array[index].optionType;
          item.itemName = 'default';
          item.price = 0.00;
          this.selectedOption[pos] = item;
          return;
        }

      }

    });
  }

  onChangeMiles(event: MatSliderChange) {
    this.travelMiles = event.value;
  }
  sumUp(): number {
    let sum = this.basePrice;
    this.selectedOptions.forEach(e => {
      const price = Number.parseFloat(e['price']);
      sum += price;
    });
    // this.selectedOption.forEach(option => {
    //   sum += option.price;
    // });
    return sum;
  }

  submit() {
    if (this.plateString === '' || this.plateAbbr === '') {
      this.messageService.showMessage('订单数据有误', '车牌号未填写');
      return;
    }
    const orderDto = {
      'selectedService': this.selectedService,
      'plateNo': this.plateAbbr + this.plateString.toUpperCase(),
      'basePrice': this.basePrice,
      'travelMiles': this.travelMiles,
      'note': this.note
    };
    this.authHttp.post(
      '/order/' + this.selectedService + '/submit',
      {
        'orderDto': orderDto,
        'optionDto': this.selectedOptions,
        'total': this.sumUp()
      }
    ).subscribe(next => {
      const result = next.json();
      if (result['success']) {
        this.messageService.showMessage('订单提交成功', '请开始作业');
      } else {
        this.messageService.showMessage('订单提交失败', result['msg']);
      }
    }, error => {
      this.messageService.showMessage('订单提交失败', error);
    }, () => {
      // this.router.navigate(['work-list']);
    });
  }

}
