import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarEnteranceComponent } from './car-enterance/car-enterance.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { CdkTableBasicExampleComponent } from './cdk-table-basic-example/cdk-table-basic-example.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexPageComponent },
  { path: 'me', component: AccountInfoComponent },
  { path: 'carEnterance', component: CarEnteranceComponent },
  { path: 'table', component: CdkTableBasicExampleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
