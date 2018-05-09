import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { JwtService } from '../jwt.service';
import { MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.css']
})
export class SlideNavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  selectedMenu = '';
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  public mouseHover = false;
  constructor(public jwtService: JwtService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 720px)');

    this._mobileQueryListener = () =>
      changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    if (this.mobileQuery.matches) {
      console.log('手机模式');
    } else {
      console.log('PC模式');
      if (this.jwtService.hasOneOfAuthorities(['ROLE_STAFF', 'ROLE_ADMIN'])) {
        this.sidenav.open();
      }
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navToggle(selectedMenu: string) {
    this.selectedMenu = selectedMenu;
    if (this.mobileQuery.matches) {
      this.sidenav.toggle();
    } else {

    }
  }

}
