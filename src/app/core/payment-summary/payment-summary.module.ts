import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSummaryRoutingModule } from './payment-summary-routing.module';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    SuccessComponent,
    FailedComponent
  ],
  imports: [
    CommonModule,
    PaymentSummaryRoutingModule,
    CoreModule
  ]
})
export class PaymentSummaryModule { }
