import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.css']
})
export class SlideNavComponent implements OnInit {

  constructor(public jwtService: JwtService) { }

  ngOnInit() {
  }

}
