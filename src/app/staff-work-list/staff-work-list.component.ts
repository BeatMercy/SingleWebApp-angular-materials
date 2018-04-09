import { Component, OnInit } from '@angular/core';
import { MessageDialogService } from '../message-dialog.service';
import { RequestOptions, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { Page, jsonToPage } from '../entity/page';
import { Order, getOrdersFromPage } from '../entity/order';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-staff-work-list',
  templateUrl: './staff-work-list.component.html',
  styleUrls: ['./staff-work-list.component.css'],
})
export class StaffWorkListComponent implements OnInit {
  private authHttp: AuthHttp;
  progress = 'PENDING';
  activePage = 'PENDING';
  pendingPage = new Page<Order>();
  workingPage: Page<Order>;
  waitingPage: Page<Order>;
  finishedPage: Page<Order>;

  constructor(
    private messageService: MessageDialogService,
    private http: Http,
    requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }

  ngOnInit() {
    this.updateWorkList(1, 5, 'PENDING');
  }


  active(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.activePage = 'PENDING';
        break;
      case 1:
        this.activePage = 'WORKING';
        break;
      case 2:
        this.activePage = 'WAITING_CONFIRM';
        break;
      case 3:
        this.activePage = 'FINISHED';
        break;
    }
    this.updateWorkList(1, 5, this.activePage);
  }
  startWork(orderNo: string) {
    this.authHttp.post(
      '/order/startWork',
      {
        'orderNo': orderNo
      }
    ).map(result => result.json()).subscribe(next => {
      if (next['success']) {
        this.pendingPage.content = this.pendingPage.content.filter(child => {
          return child.orderNo !== orderNo;
        });
      } else {
        this.messageService.showMessage('提交失败', next['msg']);
      }
    });
  }
  cancelWork(orderNo: string) {
    this.authHttp.post(
      '/order/cancelWork',
      {
        'orderNo': orderNo
      }
    ).map(result => result.json()).subscribe(next => {
      if (next['success']) {
        this.pendingPage.content = this.pendingPage.content.filter(child => {
          return child.orderNo !== orderNo;
        });
      } else {
        this.messageService.showMessage('取消失败', next['msg']);
      }
    });
  }


  updateWorkList(pageNum: number, pageSize: number, progress: string) {
    this.authHttp.post('/order/workList',
      {
        'pageableBuilder': {
          'pageNum': pageNum,
          'pageSize': pageSize
        },
        'progress': progress
      }
    )
      .map(result => result.json())
      .subscribe(next => {
        this.pendingPage = jsonToPage(next['content']);
        this.pendingPage.content = getOrdersFromPage(this.pendingPage);
      });
  }
}

