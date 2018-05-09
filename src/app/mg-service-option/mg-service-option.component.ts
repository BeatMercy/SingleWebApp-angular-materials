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
  selector: 'app-mg-service-option',
  templateUrl: './mg-service-option.component.html',
  styleUrls: ['./mg-service-option.component.css']
})
export class MgServiceOptionComponent implements OnInit {

  authHttp: AuthHttp;
  displayedColumns = ['id', 'createTime', 'itemName', 'name', 'price', 'enable', 'action'];
  tableSource = new MatTableDataSource();
  usersRsp$: Observable<Response>;

  serviceType = 'CarBeautifyOrder';
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 12;
  keyword = new Subject<string>();

  // 获取排序+分页
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
          return this.getRemoteOption('', this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
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
        return this.getRemoteOption(term, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
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

  private getRemoteOption(filter: string, sort: string, dir: string, page: number, pageSize: number): Observable<Response> {
    if (sort === undefined || sort === null) {
      sort = 'id';
    }
    if (dir === undefined || dir === null) {
      dir = 'desc';
    }
    const href = 'mg/service/options';
    const requestUrl =
      `${href}?serviceType=${this.serviceType}&keyword=${filter}&sort=${sort}&dir=${dir}&pageNum=${page + 1}&pageSize=${pageSize}`;

    return this.authHttp.get(requestUrl);
  }

  applyFilter(filterWord: string) {
    this.keyword.next(filterWord.trim());
  }

  changeEnable(event: MatSlideToggleChange, id: number) {
    let enable = 'enable';
    if (event.checked) {
      // 停用
      enable = 'disable';
    }
    this.authHttp.get(`mg/service/option/${enable}?id=${id}`)
      .map(rsp => rsp.json()).subscribe(json => {
        if (json['success']) {
          this.snackBar.open(json['msg'], 'OK', {
            verticalPosition: 'top',
            duration: 2000,
          });
        } else {
          event.source.checked = !event.checked;
          this.messageService.showMessage('失败', json['msg']);
        }
      }, error => {
        event.source.checked = !event.checked;
        console.log(error);
        this.messageService.showMessage('失败', error);
      });
  }

  serviceTypeChange(serviceType: string) {
    this.serviceType = serviceType;
    this.paginator.page.next({ pageIndex: 0, pageSize: 12, length: 0 });
  }

  addOption() {
    const dialogData = new MyMessageData('inputForm');
    dialogData.postData = {
      url: `mg/service/option/add`,
      header: null,
      body: {
        serviceType: this.serviceType
      }
    };
    dialogData.inputFields = [{
      name: 'itemName',
      placeHolder: '选项名',
      type: 'text',
      value: ''
    }, {
      name: 'name',
      placeHolder: '选项类型',
      type: 'text',
      value: ''
    }, {
      name: 'price',
      placeHolder: '价格',
      type: 'number',
      value: ''
    }];
    dialogData.messageDetail = {
      confirmText: '提交',
      text: '添加选项'
    };
    this.messageService.showAuthInputForm(dialogData)
      .subscribe(
        next => {
          if (next === false) {
            return; // 对话框选择了取消
          }
          next.subscribe(
            next2 => {
              this.messageService.showMessage('成功', next2['msg']);
              this.paginator.page.next({ pageIndex: 0, pageSize: 12, length: 0 });
            }, error => {
              this.messageService.showMessage('出错了', error['msg']);
            }
          );
        }
      );
  }
}
