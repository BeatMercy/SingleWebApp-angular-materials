import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-orders-info-dialog',
  templateUrl: './orders-info-dialog.component.html',
  styleUrls: ['./orders-info-dialog.component.css']
})
export class OrdersInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

   }

  ngOnInit() {
  }

}
