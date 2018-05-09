import { Component, OnInit, ViewChild } from '@angular/core';
import { Page, jsonToPage } from '../entity/page';
import { Order, getOrdersFromPage } from '../entity/order';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MessageDialogService } from '../message-dialog.service';
import { authHttpServiceFactory } from '../../auth.module';
import { MatSelectChange, MatPaginator } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import { of as observableOf } from 'rxjs/observable/of';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  panelOpenState = false;
  authHttp: AuthHttp;
  ordersPage = new Page<Order>();
  maintenancePage = new Page<Order>();
  repairPage = new Page<Order>();
  ordersPageNum = 1;
  orderDateRange = 'latestMonth';

  @ViewChild('ordersPaginator') orderPaginator: MatPaginator;
  @ViewChild('maintenancePaginator') maintenancePaginator: MatPaginator;
  @ViewChild('repairPaginator') repairPaginator: MatPaginator;

  constructor(private messageService: MessageDialogService,
    private http: Http,
    requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }
  ngOnInit() {
    merge(this.orderPaginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.authHttp.post(
          'me/orders',
          {
            dateRange: this.orderDateRange,
            pageNum: this.orderPaginator.pageIndex
          }).map(rsp => rsp.json());
      }),
      map(response => {
        const page = jsonToPage<Order>(response.json());
        this.orderPaginator.length = page.totalElements;
        return page.content;
      }), catchError(() => {
        // 返回空数组
        return observableOf([]);
      })
    );

    this.fetchMyOrder();
  }

  fetchMyOrder() {
    this.authHttp.post(
      'me/orders',
      {
        dateRange: this.orderDateRange,
        pageNum: this.ordersPageNum
      }).map(rsp => rsp.json())
      .subscribe(json => {
        this.ordersPage = jsonToPage(json);
        this.ordersPage.content = getOrdersFromPage(this.ordersPage);
      }, error => {
        this.messageService.showMessage('出错了！', error['message']);
      });
  }

  fetchMyMaintenance(dateRange: string, pageNum: number) {
    this.authHttp.post(
      'me/maintenanceRecord',
      {
        dateRange: this.orderDateRange,
        pageNum: this.ordersPageNum
      }).map(rsp => rsp.json())
      .subscribe(json => {

      }, error => {
          this.messageService.showMessage('出错了！', error['message']);
        });
  }

  fetchMyRepair(dateRange: string, pageNum: number) {
    this.authHttp.post(
      'me/repairRecord',
      {
        dateRange: dateRange,
        pageNum: pageNum
      }).map(rsp => rsp.json())
      .subscribe(json => {

      }, error => {
        this.messageService.showMessage('出错了！', error['message']);
      });
  }


  orderDateRangeChange(event: MatSelectChange) {
    this.orderDateRange = event.value;
    this.fetchMyOrder();
  }
  maintenanceRangeChange(event: MatSelectChange) {
    this.fetchMyMaintenance(event.value, 1);
  }
  repairRangeChange(event: MatSelectChange) {
    this.fetchMyRepair(event.value, 1);
  }
}
