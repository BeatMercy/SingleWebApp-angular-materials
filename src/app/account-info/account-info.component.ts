import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { User } from '../entity/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, RequestOptions, Response } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { AuthHttp } from 'angular2-jwt';
import { Route, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CarInfoDialogComponent } from '../car-info-dialog/car-info-dialog.component';
import { MessageDialogService } from '../message-dialog.service';
import { FUSE_TYPE, VEHICLE_TYPE } from '../entity/const';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  // 文件
  public uploader: FileUploader;

  customerMode = true;

  authHttp: AuthHttp;
  editAccountMode = false;
  editVehicleMode = false;
  user: User;
  vehicles$: Observable<Array<any>>;
  // mgMode variable
  target = new User();
  targetVehicles$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    http: Http, public snackBar: MatSnackBar,
    private messageService: MessageDialogService,
    requestOptions: RequestOptions,
    public jwtService: JwtService,
    private dialog: MatDialog
  ) {

    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.customerMode = false;
      this.fetchTratgetUser(id);
    } else {
      this.customerMode = true;
      this.user = this.jwtService.getCurrentUser();
      this.fetchMyVehicles();
    }
    this.uploader = new FileUploader({
      url: '/me/upload/headimg',
      authToken: localStorage.getItem('token')
    });
  }

  /**
      * 上传用户头像
      */
  addFile() {
    // TODO 压缩图片
    // .....
    console.log(this.uploader.queue[0]);
    this.uploader.queue[0].upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      if (result['success']) {
        this.jwtService.updateUser(null);
        this.messageService.showMessage('', '头像上传成功');
      } else {
        this.messageService.showMessage('发生错误', result['msg']);
      }
      // 完成上传
      this.uploader.clearQueue();
      this.uploader.response.observers.shift();
      this.uploader.isUploading = false;
      // as reason of TS is a typesafe lanuage. operater value before type convertion;
      (<HTMLInputElement>document.getElementById('carPic')).value = '';

    }, error => {
      this.uploader.clearQueue();
      this.messageService.showMessage('发生错误', error);
      (<HTMLInputElement>document.getElementById('carPic')).value = '';
    }, () => {
      console.log('完成车牌图片上传');
    });
  }

  userHeadImg(): string {
    let headimg = 'assets/img/default_head.jpg';
    if (this.jwtService.getCurrentUser().headimg !== undefined && this.jwtService.getCurrentUser().headimg !== null) {
      headimg = this.jwtService.getCurrentUser().headimg;
    }
    return headimg;
  }
  editAccountSubmit() {
    this.authHttp.post(
      `me/edit`,
      {
        phone: this.user.phone,
        realName: this.user.realName,
        weixin: this.user.weixin,
        qq: this.user.qq
      }
    ).subscribe(rsp => {
      const json = rsp.json();
      if (json['success']) {
        this.editAccountMode = false;
        this.snackBar.open('修改成功', 'OK');
      } else {
        this.editAccountMode = false;
        this.user = this.jwtService.getCurrentUser();
        this.messageService.showMessage('操作失败', json['msg']);
      }
    }, error => {
      this.editAccountMode = false;
      const rss = <Response>error;
      console.log(rss.json());
      this.user = this.jwtService.getCurrentUser();
      this.messageService.showMessage('操作失败', error['status']);
    });
  }
  addVehicle(plateNo: string) {
    this.editVehicleMode = false;
    const dialogRef = this.dialog.open(CarInfoDialogComponent,
      {
        hasBackdrop: true,
        maxWidth: 500,
      });
    dialogRef.afterClosed().subscribe(json => {
      if (json['success']) {
        this.fetchMyVehicles();
      }
    });
  }

  editVehicle(item: any) {
    const dialogRef = this.dialog.open(CarInfoDialogComponent,
      {
        hasBackdrop: true,
        maxWidth: 500,
        data: item
      });
    dialogRef.afterClosed().subscribe(json => {
      if (json['success']) {
        this.fetchMyVehicles();
      }
    });
  }

  remove(id: number) {
    this.authHttp.get(`me/vehicle/unbind?vehicleId=${id}`)
      .subscribe(
        next => {
          const json = next.json();
          if (json['success']) {
            this.messageService.showMessage('操作成功', '');
            this.fetchMyVehicles();
          } else {
            this.messageService.showMessage('操作失败', json['msg']);
          }
        }
      );
  }
  brandImg(brand: string): string {
    let type = 'default';
    const url = 'img/brand/';
    if (brand !== undefined && brand !== null) {
      type = brand;
    }
    return url + type;
  }

  fetchMyVehicles() {
    this.vehicles$ = this.authHttp.get('me/vehicles')
      .pipe(map(rsp => {
        rsp.json();
        return <Array<any>>rsp.json()['content'];
      }
      ));
  }

  fetchTratgetUser(id: string) {
    this.authHttp.get(`mg/user/${id}/detail`)
      .pipe(map(rsp => rsp.json())).subscribe(json => {
        this.target = json;
      }, error => {
        alert((<Response>error).json()['message']);
      });
    this.targetVehicles$ = this.authHttp.get(`mg/user/${id}/vehicles`)
      .pipe(map(rsp => {
        rsp.json();
        return rsp.json();
      }
      ));
  }

  fuseTypeView(fuseType: string): string {
    let value = '无';
    FUSE_TYPE.forEach(f => {
      if (f.value === fuseType) {
        value = f.viewValue;
      }
    });
    return value;
  }

  carTypeView(fuseType: string): string {
    let value = '无';
    VEHICLE_TYPE.forEach(f => {
      if (f.value === fuseType) {
        value = f.viewValue;
      }
    });
    return value;
  }

}
