import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';

const routes: Routes = [
  {
    path: '',
    component: SuccessComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'cancel',
    component: FailedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSummaryRoutingModule { }
