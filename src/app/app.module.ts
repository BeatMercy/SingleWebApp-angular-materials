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
} from '@angular/material';
import 'hammerjs';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { AppRoutingModule } from './app-routing.module';
import { ImageCompressService, ResizeOptions, ImageUtilityService } from 'ng2-image-compress';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableBasicExampleComponent } from './cdk-table-basic-example/cdk-table-basic-example.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    CarEnteranceComponent,
    IndexPageComponent,
    MessageDialogComponent,
    AccountInfoComponent,
    SlideNavComponent,
    CdkTableBasicExampleComponent,
    OrderSubmitComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MessageDialogComponent
  ],
  providers: [
    {
      // 路由方式：/#/xxx
      provide: LocationStrategy,
      useClass: HashLocationStrategy
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
export class AppModule { }
