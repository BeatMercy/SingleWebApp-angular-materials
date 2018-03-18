import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User, USER } from '../entity/user';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user = USER;
  isAuthenticated = false;

  loginCancel($event) {
    this.dialogRef.close();
    this.user = USER;
  }

  submit(event) {
    if (event.keyCode === 13) { // Enter按键
      this.loginSubmit();
    }
  }

  loginSubmit() {
    const result = this.jwtService.login(this.user.username, this.user.password);
    if (result['success'] === true) {
      this.isAuthenticated = true;
      this.user = USER;
    } else {
      alert('登录失败：' + result['message']);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jwtService: JwtService) {
  }

  ngOnInit() {
  }

}
