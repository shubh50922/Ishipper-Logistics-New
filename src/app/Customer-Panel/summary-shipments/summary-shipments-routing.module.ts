import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentLayoutComponent } from './shipment-layout/shipment-layout.component';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
  {
    path:'',
    component:ShipmentLayoutComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardGuard],
    children: [
      { path: 'parcel', component: ParcelDetailsComponent, canActivate:[AuthGuardGuard] },
      { path: 'delivery', component:DeliveryDetailsComponent, canActivate:[AuthGuardGuard] },
      { path: 'payment', component:PaymentDetailsComponent, canActivate:[AuthGuardGuard] },
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryShipmentsRoutingModule { }
