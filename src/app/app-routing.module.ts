import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarEnteranceComponent } from './car-enterance/car-enterance.component';
import { IndexPageComponent } from './index-page/index-page.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexPageComponent },
  { path: 'carEnterance', component: CarEnteranceComponent }
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
