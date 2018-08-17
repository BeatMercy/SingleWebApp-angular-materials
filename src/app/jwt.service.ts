import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp, JwtHelper, tokenNotExpired, AuthConfig } from 'angular2-jwt';
import { AuthModule, customAuthHttpServiceFactory } from '../auth.module';
import { map } from 'rxjs/operators';

import { User, buildUser } from './entity/user';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MessageDialogService } from './message-dialog.service';

@Injectable()
export class JwtService {
  user: User = new User();

  authConfig: AuthConfig = new AuthConfig({
    tokenName: 'token',
    noJwtError: false,
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  });

  requestOptions: RequestOptions;
  authHttp: AuthHttp;
  jwtHelper: JwtHelper = new JwtHelper();

  activeState = true;
  constructor(private http: Http, private httpClient: HttpClient, private generalHttp: Http, private messageService: MessageDialogService) {
    // this.requestOptions.headers.append('Content-Type', 'application/json');
    this.authHttp = customAuthHttpServiceFactory(this.authConfig, this.generalHttp, this.requestOptions);
    this.updateUser(localStorage.getItem('token'));
  }
  getCurrentUser() {
    return this.user;
  }

  /**
   * 更新当前用户信息
   * @param token 不传/null 默认使用本地的token
   */
  updateUser(token: string) {
    if (token === undefined || token === null || token === 'undefined') {
      token = localStorage.getItem('token');
      if (token === null) { return; }
    } else {
      localStorage.setItem('token', token);
    }
    try {
      if (!tokenNotExpired('', token)) {
        localStorage.removeItem('token');
        return;
      }
      const raw = this.jwtHelper.decodeToken(token);

      this.authHttp.get('me').pipe(map(rsp => rsp.json()))
        .subscribe(json => {
          if (json['success']) {
            const result = json['content'];
            buildUser(this.user, result['user']);
            this.user.authorities = result['authorities'];
            console.log(this.user);
          }
        }, error => {
          const json = (<Response>error).json();
          this.messageService.showMessage('错误', json['message']);
        });
    } catch (e) {
      localStorage.removeItem('token');
      console.log(e);
      return;
    }
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

  checkTokenFromServer(): boolean {
    if (!this.checkToken()) {
      localStorage.removeItem('token');
      return false;
    }
    if (this.activeState) {
      this.authHttp.get('isActiveAccount')
        .pipe(map(rsp => rsp.json()))
        .subscribe(json => {
          // 账户可用，重新激活状态
          this.activeState = true;
        }, error => {
          // 账户不可用，取消激活状态
          this.activeState = false;
          const json = (<Response>error).json();
          this.messageService.showMessage('错误', json['message']);
        });
    }
    return this.activeState;
  }

  /**
  * 当前用户拥有权限则返回true
  * 否则 false
  * @param required 符合的权限
  */
  hasAuthority(required: string): boolean {
    if (this.user.authorities === null || this.user.authorities === undefined) {
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
    if (this.user.authorities === null || this.user.authorities === undefined) {
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
    if (this.user.authorities === null || this.user.authorities === undefined) {
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


