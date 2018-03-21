import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
@Injectable()
export class MessageDialogService {

  constructor(public dialog: MatDialog) { }
  showMessage( title: string,  content: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { 'title': title, 'content': content }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
