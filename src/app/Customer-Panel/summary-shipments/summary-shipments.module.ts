import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryShipmentsRoutingModule } from './summary-shipments-routing.module';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ShipmentLayoutComponent } from './shipment-layout/shipment-layout.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ParcelDetailsComponent,
    DeliveryDetailsComponent,
    PaymentDetailsComponent,
    ShipmentLayoutComponent,
   
  ],
  imports: [
    CommonModule,
    SummaryShipmentsRoutingModule,
    FormsModule,
    CoreModule
  ]
})
export class SummaryShipmentsModule { }
