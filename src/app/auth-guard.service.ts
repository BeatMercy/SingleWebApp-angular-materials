import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { MessageDialogService } from './message-dialog.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    if (this.jwtService.checkToken()) {
      return true;
    } else {
      this.messageService.showMessage('登录信息过期', '请重新登录后再访问');
      this.router.navigate(['home']);
      return false;
    }
  }

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private messageService: MessageDialogService
  ) { }

}
