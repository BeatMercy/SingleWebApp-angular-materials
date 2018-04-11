import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions, Response } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {

  authHttp: AuthHttp;
  messageData: MyMessageData;
  confirmResult: Observable<Response>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    http: Http,
    requestOptions: RequestOptions
  ) {
    this.messageData = data;
    if (this.data.messageOnly !== true) {
      this.authHttp = authHttpServiceFactory(http, requestOptions);
    }
  }

  submit(): Observable<Response> {
    this.confirmResult = this.authHttp.post(
      this.data.postData.url,
      this.data.postData.body
    ).map(rsp => rsp.json());
    return this.confirmResult;
  }

  makeBody(i: number) {
    const fields = this.data.inputFields as Array<any>;
    this.messageData.inputFields[i].value = (<HTMLInputElement>document.getElementsByName(fields[i].name)[0]).value;
  }
  submitInputForm() {
    this.confirmResult = this.authHttp.post(
      this.data.postData.url, {
        data: this.messageData.postData.body,
        inputFields: this.messageData.inputFields
      }
    ).map(rsp => rsp.json());
    return this.confirmResult;
  }
  ngOnInit() {
  }

}
export class MyMessageDetail {
  text: string;
  confirmText: string;
}
export class MyPostData {
  url: string;
  header: string[] | null;
  body: any;
}
export class MyInputField {
  name: string;
  placeHolder: string;
  type: string;
  value: any;
}
export class MyMessageData {
  /**
   * @param type  'messageOnly' | 'confirmForm' | 'inputForm'
   */
  constructor(type: string) {
    this.messageOnly = false;
    this.isConfirmForm = false;
    this.isInputForm = false;
    switch (type) {
      case 'messageOnly':
        this.messageOnly = true;
        break;
      case 'confrimForm':
        this.isConfirmForm = true;
        break;
      case 'inputForm':
        this.isInputForm = true;
        break;
      default:
        break;
    }
    this.messageDetail = new MyMessageDetail();
    this.postData = new MyPostData();
    this.inputFields = new Array<MyInputField>();
  }
  isConfirmForm: boolean | false;
  messageOnly: boolean | true;
  isInputForm: boolean | false;
  messageDetail: MyMessageDetail;
  /**
   * 请求服务器的请求信息
   */
  postData: MyPostData;
  inputFields: Array<MyInputField>;
}
