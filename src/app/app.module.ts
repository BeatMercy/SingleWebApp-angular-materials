// Denpendency
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    CarEnteranceComponent,
    IndexPageComponent,
    MessageDialogComponent,
    AccountInfoComponent
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
  ],
  entryComponents: [
    LoginDialogComponent,
    MessageDialogComponent
  ],
  providers: [
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
