import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatSlideToggleChange } from '@angular/material';
import { Http, RequestOptions, Response } from '@angular/http';
import { MessageDialogService } from '../message-dialog.service';
import { authHttpServiceFactory } from '../../auth.module';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { startWith } from 'rxjs/operators/startWith';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { jsonToPage } from '../entity/page';
import { User } from '../entity/user';
import { OrdersInfoDialogComponent } from '../orders-info-dialog/orders-info-dialog.component';
import { StaffFormDialogComponent } from '../staff-form-dialog/staff-form-dialog.component';
import { AccountRolesDialogComponent } from '../account-roles-dialog/account-roles-dialog.component';

@Component({
  selector: 'app-mg-staff',
  templateUrl: './mg-staff.component.html',
  styleUrls: ['./mg-staff.component.css']
})
export class MgStaffComponent implements OnInit {
  authHttp: AuthHttp;
  displayedColumns = ['id', 'headimg', 'createTime', 'realName', 'phone', 'weixin', 'department', 'enable', 'action'];
  tableSource = new MatTableDataSource();
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
          return this.getRemoteStaff('', this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
        }),
        map(response => {
          const usersPage = jsonToPage<User>(response.json());
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
        return this.getRemoteStaff(term, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
      }),
      map(response => {
        const usersPage = jsonToPage<User>(response.json());
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

  private getRemoteStaff(filter: string, sort: string, dir: string, page: number, pageSize: number): Observable<Response> {
    if (sort === undefined || sort === null) {
      sort = 'id';
    }
    if (dir === undefined || dir === null) {
      dir = 'desc';
    }
    const href = 'mg/staffs';
    const requestUrl =
      `${href}?keyword=${filter}&sort=${sort}&dir=${dir}&pageNum=${page + 1}&pageSize=${pageSize}`;

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
    this.authHttp.get(`mg/staff/${enable}?id=${id}`)
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

  addStaff() {
    this.dialog.open(StaffFormDialogComponent, {
      closeOnNavigation: true,
      data: { createMode: true }
    })
      .afterClosed().subscribe(result => {
        if (result['success']) {
          this.messageService.showMessage('创建成功', '');
          this.paginator.page.next({ pageIndex: 0, pageSize: 12, length: 0 });
        } else {
          this.messageService.showMessage('创建失败', result['msg']);
        }
      }, error => {
        this.messageService.showMessage('创建失败error', error['msg']);
      });
  }
  edit(staff: any) {
    this.dialog.open(StaffFormDialogComponent, {
      closeOnNavigation: true,
      data: { createMode: true, staff: staff }
    });
  }
  viewStaffOrders(id: number) {
    this.authHttp.get(`mg/staff/latestmonth-orders?id=${id}`)
      .map(rsp => rsp.json()).subscribe(json => {
        if (json['success']) {
          this.dialog.open(OrdersInfoDialogComponent, {
            closeOnNavigation: true,
            data: json['content']
          });
        } else {
          this.messageService.showMessage('查询失败', json['msg']);
        }
      }, error => {
        this.messageService.showMessage('查询失败', error);
      });
  }
  authority(staff: any) {
    this.dialog.open(AccountRolesDialogComponent, {
      closeOnNavigation: true,
      data: staff
    });
  }
}
