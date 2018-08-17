import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatSort, MatTableDataSource, MatPaginator, MatInput, MatButtonToggleChange,
  MatSlideToggleChange, MatDialog, MatSnackBar
} from '@angular/material';
import { Http, RequestOptions, Response } from '@angular/http';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { MessageDialogService } from '../message-dialog.service';
import { jsonToPage } from '../entity/page';
import { ServiceOption } from '../entity/service-option';
import { MyMessageData } from '../message-dialog/message-dialog.component';
import { FUSE_TYPE, VEHICLE_TYPE } from '../entity/const';

@Component({
  selector: 'app-mg-vehicle',
  templateUrl: './mg-vehicle.component.html',
  styleUrls: ['./mg-vehicle.component.css']
})
export class MgVehicleComponent implements OnInit {

  authHttp: AuthHttp;
  displayedColumns = [
    'id', 'broughtDate', 'brand', 'plateNo',
    'travelMiles', 'fuseType', 'vehicleType', 'owner', 'action'
  ];
  tableSource = new MatTableDataSource();
  usersRsp$: Observable<Response>;

  serviceType = 'CarBeautifyOrder';
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 12;
  keyword = new Subject<string>();


  vehicleType = VEHICLE_TYPE;
  fuseType = FUSE_TYPE;


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
          return this.getRemoteVehicle('', this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
        }),
        map((response: Response) => {
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
        return this.getRemoteVehicle(term, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
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

  getRemoteVehicle(filter: string, sort: string, dir: string, page: number, pageSize: number): Observable<Response> {
    if (sort === undefined || sort === null) {
      sort = 'id';
    }
    if (dir === undefined || dir === null || dir === '') {
      dir = 'desc';
    }
    const href = `mg/vehicle/all`;
    const requestUrl =
      `${href}?serviceType=${this.serviceType}&keyword=${filter}&sort=${sort}&dir=${dir}&pageNum=${page + 1}&pageSize=${pageSize}`;

    return this.authHttp.get(requestUrl);
  }

  vehicleTypeName(key: string): string {
    const result = this.vehicleType.find(v => v.value === key);
    if (result === undefined || result === null) {
      return '未知类型';
    }
    return result.viewValue;
  }

  fuseTypeName(key: string): string {
    const result = this.fuseType.find(v => v.value === key);
    if (result === undefined || result === null) {
      return '未知类型';
    }
    return result.viewValue;
  }
}
