import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    if (this.jwtService.checkToken()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }

  constructor(private router: Router, private jwtService: JwtService) { }

}
