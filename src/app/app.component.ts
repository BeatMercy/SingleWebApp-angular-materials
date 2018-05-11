import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { MessageDialogService } from './message-dialog.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '易车服';
  constructor(
    private messageService: MessageDialogService,
    private router: Router,
    public dialog: MatDialog,
    public jwtService: JwtService) {

    router.onSameUrlNavigation = 'reload';
  }
  ngOnInit() {
    if (this.jwtService.checkToken()) {
      // if (this.jwtService.hasAuthority('ROLE_TECH_STAFF')) {
      //   this.router.navigate(['work-list']);
      // } else {
      //   this.router.navigate(['me']);
      // }

    }
  }
  ngOnDestory(): void {
  }

  public toHome() {
    this.router.navigate(['/home']);
  }

  userHeadImg(): string {
    let headimg = 'assets/img/default_head.jpg';
    if (this.jwtService.getCurrentUser().headimg !== undefined && this.jwtService.getCurrentUser().headimg !== null) {
      headimg = this.jwtService.getCurrentUser().headimg;
    }
    return headimg;
  }

  loginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }

  logout(): void {
    this.jwtService.logout();
    this.messageService.showMessage('消息', '你已注销');
    this.router.navigate(['/home']);
  }

}
