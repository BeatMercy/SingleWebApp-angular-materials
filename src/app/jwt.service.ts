import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, HOST_URL } from './entity/user';

@Injectable()
export class JwtService {
  tokenJson: JSON;
  token: string;
  success = false;
  jsonString = '';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): object {
    const json = this.http.post<JSON>('/login',
      { username, password });
    if (json['token'] != null) {
      this.success = true;
      this.jsonString = '{ "success": true, "message": "Promise!！" }';
      console.log(this.success);
      const result = JSON.parse(<string>this.jsonString);
      return result;
    } else {
      this.success = false;
      this.jsonString = '{ "success": false, "message": "Reject!！" }';
      console.log(this.success);
      console.log(<string>this.jsonString);
      const result = JSON.parse(<string>this.jsonString);
      return result;

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
  }

}
