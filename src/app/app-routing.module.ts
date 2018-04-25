import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarEnteranceComponent } from './car-enterance/car-enterance.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { OrderSubmitComponent } from './order-submit/order-submit.component';
import { StaffWorkListComponent } from './staff-work-list/staff-work-list.component';
import { CashierBoardComponent } from './cashier-board/cashier-board.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MgUserComponent } from './mg-user/mg-user.component';
import { MgStaffComponent } from './mg-staff/mg-staff.component';
import { MgServiceOptionComponent } from './mg-service-option/mg-service-option.component';
const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: IndexPageComponent },
  { path: 'home', component: IndexPageComponent },
  { path: 'me', component: AccountInfoComponent },
  { path: 'carEnterance', component: CarEnteranceComponent },
  { path: 'mg-user', component: MgUserComponent },
  { path: 'mg-user/account/:id', component: AccountInfoComponent },
  { path: 'mg-staff', component: MgStaffComponent },
  { path: 'mg-service-option', component: MgServiceOptionComponent },
  { path: 'orderSubmit', component: OrderSubmitComponent },
  { path: 'cashier-board', component: CashierBoardComponent },
  { path: 'my-orders', component: MyOrdersComponent },
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
