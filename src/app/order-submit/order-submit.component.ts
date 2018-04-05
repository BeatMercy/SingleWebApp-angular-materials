import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { MessageDialogService } from '../message-dialog.service';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.css']
})
export class OrderSubmitComponent implements OnInit, OnDestroy {

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

  abbrControl: FormControl = new FormControl();

  // 文件
  public uploader: FileUploader;

  defaultService = '洗车美容';
  // 此处的值是mat option的value 而不是viewValue
  selectedService = 'carBeautifyOrder';
  basePrice = 0.00;
  panelOpenState = false;

  constructor(private messageService: MessageDialogService) {

    this.uploader = new FileUploader({
      url: 'URL',
      authToken: localStorage.getItem('token')
    });

  }

  ngOnInit() {
    console.log('此时执行创建方法');
  }
  ngOnDestroy() {
    // 在切换component时会执行销毁方法
    console.log('此时执行销毁方法');
  }

  addFile(file) {
    console.log('方法传入的文件');
    console.log(file);
    console.log('uploader的文件');
    console.log(this.uploader.queue[0]);
  }
  uploadOne(file: FileItem) {
    file.upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      console.log(result['content']);
      this.messageService.showMessage(result['msg'], result['content']);
      this.uploader.response.observers.shift();
    }, error => {
      console.log(error);
    }, () => {
      console.log('finfished!!!!!!1');
    });
  }

}
