import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarEnteranceComponent } from './car-enterance/car-enterance.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { CdkTableBasicExampleComponent } from './cdk-table-basic-example/cdk-table-basic-example.component';
import { OrderSubmitComponent } from './order-submit/order-submit.component';
import { StaffWorkListComponent } from './staff-work-list/staff-work-list.component';
const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: IndexPageComponent },
  { path: 'home', component: IndexPageComponent },
  { path: 'me', component: AccountInfoComponent },
  { path: 'carEnterance', component: CarEnteranceComponent },
  { path: 'table', component: CdkTableBasicExampleComponent },
  { path: 'orderSubmit', component: OrderSubmitComponent },
  { path: 'work-list', component: StaffWorkListComponent }
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
