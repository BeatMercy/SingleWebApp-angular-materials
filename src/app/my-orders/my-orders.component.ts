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
  orderDateRange = 'latestMonth';
  ordersPage = new Page<Order>();
  maintenanceDateRange = 'latestMonth';
  maintenancePage = new Page<Order>();
  repairDateRange = 'latestMonth';
  repairPage = new Page<Order>();
  ordersPageNum = 1;

  ordersOpened = true;
  maintenanceOpened: boolean;
  repairOpened: boolean;
  @ViewChild('ordersPaginator') orderPaginator: MatPaginator;
  @ViewChild('maintenancePaginator') maintenancePaginator: MatPaginator;
  @ViewChild('repairPaginator') repairPaginator: MatPaginator;

  constructor(private messageService: MessageDialogService,
    private http: Http,
    requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }
  ngOnInit() {
    this.orderPaginator.page.pipe(
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
    this.maintenancePaginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.authHttp.post(
          'me/maintenanceRecord',
          {
            dateRange: this.maintenanceDateRange,
            pageNum: this.maintenancePaginator.pageIndex
          }).map(rsp => rsp.json());
      }),
      map(response => {
        const page = jsonToPage<Order>(response.json());
        this.maintenancePaginator.length = page.totalElements;
        return page.content;
      }), catchError(() => {
        // 返回空数组
        return observableOf([]);
      })
    );
    this.repairPaginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.authHttp.post(
          'me/maintenanceRecord',
          {
            dateRange: this.repairDateRange,
            pageNum: this.repairPaginator.pageIndex
          }).map(rsp => rsp.json());
      }),
      map(response => {
        const page = jsonToPage<Order>(response.json());
        this.repairPaginator.length = page.totalElements;
        return page.content;
      }), catchError(() => {
        // 返回空数组
        return observableOf([]);
      })
    );

    this.fetchMyOrder();
    this.fetchMyMaintenance('latestMonth', 1);
    this.fetchMyRepair('latestMonth', 1);
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
        dateRange: dateRange,
        pageNum: pageNum
      }).map(rsp => rsp.json())
      .subscribe(json => {
        this.maintenancePage = jsonToPage(json);
        this.maintenancePage.content = getOrdersFromPage(this.maintenancePage);
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
        this.repairPage = jsonToPage(json);
        this.repairPage.content = getOrdersFromPage(this.repairPage);
      }, error => {
        this.messageService.showMessage('出错了！', error['message']);
      });
  }

  openPage(pageName: string) {
    switch (pageName) {
      case 'orders':
        this.ordersOpened = true;
        this.maintenanceOpened = false;
        this.repairOpened = false;
        document.getElementById('ordersPaginator').className = '';
        document.getElementById('maintenancePaginator').className = 'disappear';
        document.getElementById('repairPaginator').className = 'disappear';
        return;
      case 'maintenance':
        this.ordersOpened = false;
        this.maintenanceOpened = true;
        this.repairOpened = false;
        document.getElementById('ordersPaginator').className = 'disappear';
        document.getElementById('maintenancePaginator').className = '';
        document.getElementById('repairPaginator').className = 'disappear';
        return;
      case 'repair':
        this.ordersOpened = false;
        this.maintenanceOpened = false;
        this.repairOpened = true;
        document.getElementById('ordersPaginator').className = 'disappear';
        document.getElementById('maintenancePaginator').className = 'disappear';
        document.getElementById('repairPaginator').className = '';
        return;
      default:
        return false;
    }
  }

  orderDateRangeChange(event: MatSelectChange) {
    this.orderDateRange = event.value;
    this.fetchMyOrder();
  }
  maintenanceRangeChange(event: MatSelectChange) {
    this.maintenanceDateRange = event.value;
    this.fetchMyMaintenance(event.value, 1);
  }
  repairRangeChange(event: MatSelectChange) {
    this.repairDateRange = event.value;
    this.fetchMyRepair(event.value, 1);
  }
}
