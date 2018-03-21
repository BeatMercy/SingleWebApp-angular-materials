import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, JwtHelper, tokenNotExpired, AuthConfig } from 'angular2-jwt';
import { AuthModule, customAuthHttpServiceFactory } from '../auth.module';

import { User, HOST_URL } from './entity/user';

@Injectable()
export class JwtService {
  authConfig: AuthConfig = new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  });
  requestOptions: RequestOptions;
  authHttp: AuthHttp;
  constructor(private http: Http, private httpClient: HttpClient, private jwtHttp: Http) {
    // this.requestOptions.headers.append('Content-Type', 'application/json');
    this.authHttp = customAuthHttpServiceFactory(this.authConfig, this.jwtHttp, this.requestOptions);
  }

  jwtHelper: JwtHelper = new JwtHelper();

  /**
   * true if not expired
   */
  checkToken() {
    const token = this.authConfig.getConfig().tokenGetter();
    if (token === 'undefined' || token === undefined || token === null) {
      return false;
    } else {
      return tokenNotExpired('', token.toString());
    }
  }

  logout() {
    console.log(sessionStorage.removeItem('token'));
    console.log(sessionStorage.getItem('token'));
    this.httpClient.post<JSON>('/logout', {});
  }


}

/*this.http.post<JSON>('/login',
      { username, password }).toPromise().then(value => {
        console.log(value);
        this.success = true;
        this.jsonString = '{ "success": true, "message": "Promise!！" }';
      }, (reason) => {
        this.success = true;
        console.log(reason);
        this.jsonString = '{ "success": true, "message": "Reject!！" }';
      }); */
    /**
     * subscribe
     **/
    /* this.http.post<JSON>('/login',
      { username, password }).subscribe(
      next => {
        this.token = next['token'];
      },
      response => {
        const error = response['error'];
        // console.log(response);
        this.success = false;
        this.jsonString = '{ "success": false, "mesage": "登录失败:' + error['message'] + '"}';
        // console.log(this.jsonString);
      },
      () => {
        // after next operation
        this.success = true;
        this.jsonString = '{ "success": true, "message": "登录成功！" }';
      }); */
