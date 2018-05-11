import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatSort, MatTableDataSource, MatPaginator, MatInput, MatButtonToggleChange,
  MatSlideToggleChange, MatDialog, MatSnackBar
} from '@angular/material';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { startWith } from 'rxjs/operators/startWith';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { MessageDialogService } from '../message-dialog.service';
import { jsonToPage } from '../entity/page';
import { ServiceOption } from '../entity/service-option';
import { MyMessageData } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-mg-order',
  templateUrl: './mg-order.component.html',
  styleUrls: ['./mg-order.component.css']
})
export class MgOrderComponent implements OnInit {

  authHttp: AuthHttp;
  displayedColumns = [
    'orderNo', 'createTime', 'endTime', 'plateNo',
    'basePrice', 'total', 'state', 'progress', 'action'
  ];
  tableSource = new MatTableDataSource();
  usersRsp$: Observable<Response>;

  serviceType = 'CarBeautifyOrder';
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 12;
  keyword = new Subject<string>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(http: Http,
    requestOptions: RequestOptions,
    private messageService: MessageDialogService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }


  ngOnInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getRemoteOrder('', this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
        }),
        map(response => {
          const usersPage = jsonToPage<ServiceOption>(response.json());
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = usersPage.totalElements;
          return usersPage.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          // 返回空数组
          return observableOf([]);
        })
      )
      .subscribe(users => this.tableSource.data = users);
    this.keyword.pipe(
      // 等待300毫秒输入搜索关键字
      debounceTime(300),
      // 忽略相同的搜索字段
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.isLoadingResults = true;
        return this.getRemoteOrder(term, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
      }),
      map(response => {
        const usersPage = jsonToPage<ServiceOption>(response.json());
        setTimeout(() => {
          this.isLoadingResults = false;
        }, 300);
        this.isRateLimitReached = false;
        this.resultsLength = usersPage.totalElements;
        return usersPage.content;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        // 返回空数组
        return observableOf([]);
      })
    ).subscribe(data => { this.tableSource.data = data; });
  }

  applyFilter(filterWord: string) {
    this.keyword.next(filterWord.trim());
  }

  serviceTypeChange(serviceType: string) {
    this.serviceType = serviceType;
    this.paginator.page.next({ pageIndex: 0, pageSize: 12, length: 0 });
  }

  getOption(selectedOption: any): any[] {
    if (selectedOption === null) {
      return new Array<object>();
    }
    const result = new Array<object>();
    const keys = Object.keys(selectedOption);
    for (let index = 0; index < keys.length; index++) {
      result.push({
        key: keys[index],
        value: selectedOption[keys[index]]
      });
    }
    return result;
  }
  handleStaff(staffId: number) {

  }
  belongUser(userId: number) {

  }

  getRemoteOrder(filter: string, sort: string, dir: string, page: number, pageSize: number): Observable<Response> {
    if (sort === undefined || sort === null) {
      sort = 'id';
    }
    if (dir === undefined || dir === null) {
      dir = 'desc';
    }
    const href = `mg/order/all`;
    const requestUrl =
      `${href}?serviceType=${this.serviceType}&keyword=${filter}&sort=${sort}&dir=${dir}&pageNum=${page + 1}&pageSize=${pageSize}`;

    return this.authHttp.get(requestUrl);
  }

}

