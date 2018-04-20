import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vehicles-info-dialog',
  templateUrl: './vehicles-info-dialog.component.html',
  styleUrls: ['./vehicles-info-dialog.component.css']
})
export class VehiclesInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  brandImg(brand: string): string {
    let type = 'default';
    const url = 'img/brand/';
    if (brand !== undefined && brand !== null) {
      type = brand;
    }
    return url + type;
  }

}
