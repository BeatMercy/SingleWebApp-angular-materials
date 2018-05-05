// Denpendency
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorIntl,
} from '@angular/material';
import 'hammerjs';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { AppRoutingModule } from './app-routing.module';
import { ImageCompressService, ResizeOptions, ImageUtilityService } from 'ng2-image-compress';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


// App
import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtService } from './jwt.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth.module';
import { CarEnteranceComponent } from './car-enterance/car-enterance.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { HttpModule } from '@angular/http';
import { AuthGuardService } from './auth-guard.service';
import { MessageDialogService } from './message-dialog.service';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ProductRetrieveService } from './product-retrieve.service';
import { SlideNavComponent } from './slide-nav/slide-nav.component';
import { OrderSubmitComponent } from './order-submit/order-submit.component';
import { StaffWorkListComponent } from './staff-work-list/staff-work-list.component';
import { CashierBoardComponent } from './cashier-board/cashier-board.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MgUserComponent } from './mg-user/mg-user.component';
import { MgServiceOptionComponent } from './mg-service-option/mg-service-option.component';
import { LocaleModule } from './locale';
import { MyPaginator } from './my-paginator';
import { VehiclesInfoDialogComponent } from './vehicles-info-dialog/vehicles-info-dialog.component';
import { MgStaffComponent } from './mg-staff/mg-staff.component';
import { OrdersInfoDialogComponent } from './orders-info-dialog/orders-info-dialog.component';
import { StaffFormDialogComponent } from './staff-form-dialog/staff-form-dialog.component';
import { AccountRolesDialogComponent } from './account-roles-dialog/account-roles-dialog.component';
import { CarRepairOrderSubmitComponent } from './car-repair-order-submit/car-repair-order-submit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    CarEnteranceComponent,
    IndexPageComponent,
    MessageDialogComponent,
    AccountInfoComponent,
    SlideNavComponent,
    OrderSubmitComponent,
    StaffWorkListComponent,
    CashierBoardComponent,
    MyOrdersComponent,
    MgUserComponent,
    MgServiceOptionComponent,
    VehiclesInfoDialogComponent,
    MgStaffComponent,
    OrdersInfoDialogComponent,
    StaffFormDialogComponent,
    AccountRolesDialogComponent,
    CarRepairOrderSubmitComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // 时区Module
    LocaleModule,
    // http client
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AuthModule,
    FileUploadModule,
    AppRoutingModule,
    FlexLayoutModule,
    // Materials module
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    LoginDialogComponent,
    MessageDialogComponent,
    VehiclesInfoDialogComponent,
    OrdersInfoDialogComponent,
    StaffFormDialogComponent,
    AccountRolesDialogComponent
  ],
  providers: [
    {
      // 路由方式：/#/xxx
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, {
      provide: MatPaginatorIntl,
      useClass: MyPaginator
    },
    JwtService,
    AuthGuardService,
    MessageDialogService,
    ImageCompressService,
    ResizeOptions,
    ProductRetrieveService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
