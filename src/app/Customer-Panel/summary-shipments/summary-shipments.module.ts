import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryShipmentsRoutingModule } from './summary-shipments-routing.module';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ShipmentLayoutComponent } from './shipment-layout/shipment-layout.component';


@NgModule({
  declarations: [
    ParcelDetailsComponent,
    DeliveryDetailsComponent,
    PaymentDetailsComponent,
    ShipmentLayoutComponent
  ],
  imports: [
    CommonModule,
    SummaryShipmentsRoutingModule
  ]
})
export class SummaryShipmentsModule { }
