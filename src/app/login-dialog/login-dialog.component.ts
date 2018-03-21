import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../entity/user';
import { JwtService } from '../jwt.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user = new User();
  isAuthenticated = false;

  constructor(private httpClient: HttpClient,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jwtService: JwtService
  ) {
  }

  loginCancel($event) {
    this.dialogRef.close();
    this.user = new User();
  }

  submit($event) {
    if ($event.keyCode === 13) { // Enter按键
      this.loginSubmit();
    }
  }

  loginSubmit() {
    const username = this.user.username;
    const password = this.user.password;
    this.httpClient.post<JSON>('/login', { username, password })
      .subscribe(next => {
        sessionStorage.setItem('token', next['token']);
        this.jwtService.updateUser(next['token']);
      },
      error => {
        alert('登录失败：');
      },
      () => {
        if (this.jwtService.checkToken()) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
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
