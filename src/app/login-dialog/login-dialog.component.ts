import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../entity/user';
import { JwtService } from '../jwt.service';
import { HttpClient } from '@angular/common/http';
import { MessageDialogService } from '../message-dialog.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user = new User();
  loginMode = true;
  password = '';
  confirmPassword = '';
  realName = '';
  phone = '';
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
          this.messageService.showMessage('登录失败', '密码错误');
        },
        () => {

        });
  }

  private phoneValid(phone: string): boolean {
    if (phone.length !== 11) {
      return false;
    }
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let i = 0; i < 11; i++) {
      if (!numbers.includes(phone[i], 0)) {
        return false;
      }
    }
    return true;
  }

  signUp() {
    if (!this.phoneValid(this.phone)) {
      this.messageService.showMessage('提交失败', '手机位数不正确');
      return;
    }
    if (this.password !== this.confirmPassword || this.password === '') {
      this.messageService.showMessage('提交失败', '密码不一致');
      return;
    }

    this.httpClient.post<Response>(
      'signup',
      {
        phone: this.phone,
        password: this.password,
        username: this.phone,
        realName: this.realName
      }
    ).subscribe(json => {
      if (json['success']) {
        this.jwtService.updateUser(json['content']);
        this.dialogRef.close();
        this.messageService.showMessage('注册成功', '');
      } else {
        this.messageService.showMessage('注册失败', json['msg']);
      }
    });
  }


  ngOnInit() {
  }

}
