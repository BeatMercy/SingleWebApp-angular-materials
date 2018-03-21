import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '易车服';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public jwtService: JwtService) {
  }
  ngOnDestory(): void {
  }

  loginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }

  logout(): void {
    this.jwtService.logout();
    this.router.navigate(['/home']);
  }

}
