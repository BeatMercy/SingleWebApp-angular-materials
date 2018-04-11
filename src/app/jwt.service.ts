import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp, JwtHelper, tokenNotExpired, AuthConfig } from 'angular2-jwt';
import { AuthModule, customAuthHttpServiceFactory } from '../auth.module';
import { Observable } from 'rxjs/Observable';

import { User, buildUser } from './entity/user';

@Injectable()
export class JwtService {
  user: User = new User();

  authConfig: AuthConfig = new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  });

  requestOptions: RequestOptions;
  authHttp: AuthHttp;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private httpClient: HttpClient, private generalHttp: Http) {
    // this.requestOptions.headers.append('Content-Type', 'application/json');
    this.authHttp = customAuthHttpServiceFactory(this.authConfig, this.generalHttp, this.requestOptions);
    this.updateUser(localStorage.getItem('token'));
  }
  getCurrentUser() {
    return this.user;
  }

  updateUser(token: string) {
    if (token === undefined || token === null || token === 'undefined') {
      token = localStorage.getItem('token');
      if (token === null) { return; }
    } else {
      localStorage.setItem('token', token);
    }

    const raw = this.jwtHelper.decodeToken(token);
    this.authHttp.get('me').map(rsp => rsp.json())
      .subscribe(json => {
        if (json['success']) {
          buildUser(this.user, json['content']);
          this.user.authorities = raw['authorities'];
          console.log(this.user);
        }
      });
  }


  logout() {
    localStorage.removeItem('token');
    this.user = new User();
    console.log(localStorage.getItem('token'));
    this.httpClient.post<JSON>('/logout', {});
  }

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

  /**
  * 当前用户拥有权限则返回true
  * 否则 false
  * @param required 符合的权限
  */
  hasAuthority(required: string): boolean {
    if (this.user.authorities === null) {
      return false;
    }
    if (this.user.authorities.includes(required)) {
      return true;
    }
    return false;
  }
  /**
   * 当前用户拥有任一权限集合中的权限则，返回true
   * 否则 false
   * @param authorities 符合的权限集合
   */
  hasOneOfAuthorities(authorities: string[]): boolean {
    let result = false;
    if (this.user.authorities === null) {
      return false;
    }
    authorities.forEach(required => {
      if (this.user.authorities.includes(required)) {
        result = true;
      }
    });
    return result;
  }
  /**
     * 当前用户拥有权限集合中的所有权限，则返回true
     * 否则 false
     * @param authorities 符合的权限集合
     */
  hasBothAuthorities(authorities: string[]): boolean {
    let result = true;
    if (this.user.authorities === null) {
      return false;
    }
    authorities.forEach(required => {
      if (!this.user.authorities.includes(required)) {
        result = false;
      }
    });
    return result;
  }
}


