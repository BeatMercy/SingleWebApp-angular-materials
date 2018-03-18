import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '易车服 汽车美容中心';
  constructor(public dialog: MatDialog) { }

  loginDialog() {
    console.log('login Form open');
    this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: {
        animal: 'panda'
      }
    });
  }

}