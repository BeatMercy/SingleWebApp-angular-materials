import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { User } from '../entity/user';
import { Observable } from 'rxjs/observable';
import { Http, RequestOptions } from '@angular/http';
import { authHttpServiceFactory } from '../../auth.module';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  authHttp: AuthHttp;
  editAccountMode = false;
  editVehicleMode = false;
  user: User;
  vehicles$: Observable<Array<any>>;

  constructor(http: Http, requestOptions: RequestOptions,
    public jwtService: JwtService
  ) {
    this.authHttp = authHttpServiceFactory(http, requestOptions);
  }

  ngOnInit() {
    this.user = this.jwtService.getCurrentUser();
    this.fetchMyVehicles();
  }

  userHeadImg(): string {
    let headimg = 'assets/img/default_head.jpg';
    if (this.jwtService.getCurrentUser().headimg !== undefined && this.jwtService.getCurrentUser().headimg !== null) {
      headimg = this.jwtService.getCurrentUser().headimg;
    }
    return headimg;
  }

  addVehicle(plateNo: string) {
    this.editVehicleMode = false;
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
      .map(rsp => {
        rsp.json();
        return <Array<any>>rsp.json()['content'];
      }
      );
  }



}
