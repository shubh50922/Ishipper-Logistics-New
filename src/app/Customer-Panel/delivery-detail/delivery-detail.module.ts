import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryDetailRoutingModule } from './delivery-detail-routing.module';
import { DeliveryLayoutComponent } from './delivery-layout/delivery-layout.component';
import { TopStriperComponent } from './top-striper/top-striper.component';
import { ParcelDetailComponent } from './parcel-detail/parcel-detail.component';
import { DeliveryAdressComponent } from './delivery-adress/delivery-adress.component';
import { CollectionAdressComponent } from './collection-adress/collection-adress.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DeliveryLayoutComponent,
    TopStriperComponent,
    ParcelDetailComponent,
    DeliveryAdressComponent,
    CollectionAdressComponent,
    
  ],
  imports: [
    CommonModule,
    DeliveryDetailRoutingModule,
    GooglePlaceModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DeliveryDetailModule { }
