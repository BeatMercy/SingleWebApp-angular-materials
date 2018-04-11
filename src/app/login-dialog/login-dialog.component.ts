import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../entity/user';
import { JwtService } from '../jwt.service';
import { HttpClient } from '@angular/common/http';
import { MessageDialogService } from '../message-dialog.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user = new User();
  loginMode = true;
  constructor(private httpClient: HttpClient,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private messageService: MessageDialogService,
    private jwtService: JwtService
  ) {
  }

  loginCancel() {
    this.dialogRef.close();
    this.user = new User();
  }

  loginSubmit() {
    const username = this.user.username;
    const password = this.user.password;
    this.httpClient.post<JSON>('/login', { username, password })
      .subscribe(next => {
        // localStorage.setItem('token', next['token']);
        this.jwtService.updateUser(next['token']);
        this.dialogRef.close();
        this.messageService.showMessage('消息', '登录成功');
      },
        error => {
          this.messageService.showMessage('消息', '登录失败: ' + error);
        },
        () => {

        });

    // this.jwtService.login(this.user.username, this.user.password);
    // if (this.jwtService.checkToken()) {
    //   this.isAuthenticated = true;
    //   this.user = new User();
    // } else {
    //   alert('登录失败：');
    // }
    // const result = this.jwtService.login(this.user.username, this.user.password);
    // if (result['success'] === true) {
    //   this.isAuthenticated = true;
    //   this.user = USER;
    // } else {
    //   alert('登录失败：' + result['message']);
    // }
  }

  ngOnInit() {
  }

}
