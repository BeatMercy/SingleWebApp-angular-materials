import { Component, OnInit } from '@angular/core';
import { MessageDialogService } from '../message-dialog.service';
import { RequestOptions, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { Page, jsonToPage } from '../entity/page';
import { Order, getOrdersFromPage } from '../entity/order';
import { MatTabChangeEvent } from '@angular/material';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import { Element } from '@angular/compiler';
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
  pageSize = 5;
  constructor(
    private messageService: MessageDialogService,
    private http: Http,
    requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }

  ngOnInit() {
    this.updateWorkList(1, this.pageSize, 'PENDING');
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
        this.activePage = 'FINISHED';
        break;
      case 3:
        this.activePage = 'WAITING_CONFIRM';
        break;
    }
    this.updateWorkList(1, 5, this.activePage);
  }
  findParent(element: HTMLElement, parentClass: string): HTMLElement {
    if (element.parentElement.classList.contains(parentClass)) {
      return element.parentElement;
    } else {
      return this.findParent(element.parentElement, parentClass);
    }
  }
  submitWork(action: string, orderNo: string, event: MouseEvent) {
    const url = '/order/' + action + 'Work';
    // event.srcElement.parentElement.parentElement.parentElement.className += ' flush';
    this.findParent(event.srcElement.parentElement, 'orderItem').className += ' flush';
    this.authHttp.post(
      url,
      {
        'orderNo': orderNo
      }
    ).map(result => result.json()).delay(300).subscribe(next => {
      if (next['success']) {
        this.pendingPage.content = this.pendingPage.content.filter(child => {
          return child.orderNo !== orderNo;
        });
        this.messageService.showMessage('成功', next['msg']);
        // this.updateWorkList(this.pendingPage.number + 1, this.pageSize, this.progress);
      } else {
        // event.srcElement.parentElement.parentElement.parentElement.classList.remove('flush');
        this.findParent(event.srcElement.parentElement, 'orderItem').classList.remove('flush');
        this.messageService.showMessage('提交失败', next['msg']);
      }
    });
  }

  pageEnd(isNext: boolean): boolean {
    if (isNext) {
      return (this.pendingPage.number + 1) >= this.pendingPage.totalPages;
    } else {
      return this.pendingPage.number <= 0;
    }
  }
  beforePage() {
    // pageNum=(number+1) nextPage=(number+1)+1
    this.updateWorkList(this.pendingPage.number, this.pageSize, this.progress);
  }
  nextPage() {
    this.updateWorkList(this.pendingPage.number + 2, this.pageSize, this.progress);
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

