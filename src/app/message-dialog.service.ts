import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MessageDialogComponent, MyMessageData } from './message-dialog/message-dialog.component';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MessageDialogService {

  constructor(public dialog: MatDialog) { }

  showMessage(title: string, content: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        'messageOnly': true,
        'title': title,
        'content': content
      },
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showAuthConfirmForm(url: string, body: any, messageDetail: any): any {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        'isConfirmForm': true,
        'postData': {
          'url': url,
          'body': body
        },
        'messageDetail': messageDetail
      },
      closeOnNavigation: true
    });

    return dialogRef.afterClosed();
  }

  showAuthInputForm(messageData: MyMessageData) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: messageData,
      closeOnNavigation: true
    });

    return dialogRef.afterClosed();
  }
}
