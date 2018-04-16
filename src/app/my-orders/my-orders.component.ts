import { Component, OnInit } from '@angular/core';
import { Page, jsonToPage } from '../entity/page';
import { Order, getOrdersFromPage } from '../entity/order';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MessageDialogService } from '../message-dialog.service';
import { authHttpServiceFactory } from '../../auth.module';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  panelOpenState = false;
  authHttp: AuthHttp;
  ordersPage = new Page<Order>();
  ordersPageNum = 1;
  orderDateRange = 'latestMonth';

  constructor(private messageService: MessageDialogService,
    private http: Http,
    requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }
  ngOnInit() {
    this.fetchMyOrder();
  }

  pageEnd(isNext: boolean, page: Page<any>): boolean {
    if (isNext) {
      return (page.number + 1) >= page.totalPages;
    } else {
      return page.number <= 0;
    }
  }

  fetchMyOrder() {
    this.authHttp.post(
      'me/orders',
      {
        dateRange: this.orderDateRange,
        pageNum: this.ordersPageNum
      }).map(rsp => rsp.json())
      .subscribe(json => {
        if (json['success']) {
          this.ordersPage = jsonToPage(json['content']);
          this.ordersPage.content = getOrdersFromPage(this.ordersPage);
        } else {
          this.messageService.showMessage('出错了！', json['msg']);
        }
      });
  }

}
