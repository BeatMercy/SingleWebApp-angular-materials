import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule } from '@angular/forms';
import { JwtService } from './jwt.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [JwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
