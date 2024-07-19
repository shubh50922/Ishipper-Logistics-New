import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CheapestServiceComponent } from './cheapest-service/cheapest-service.component';
import { FastestServiceComponent } from './fastest-service/fastest-service.component';
import { SamedayServiceComponent } from './sameday-service/sameday-service.component';
import { CarrierNameComponent } from './carrier-name/carrier-name.component';
import { CollectionTodayComponent } from './collection-today/collection-today.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
     
    CheapestServiceComponent,
    FastestServiceComponent,
    SamedayServiceComponent,
    CarrierNameComponent,
    CollectionTodayComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    CoreModule

  ]
})
export class CustomerDashboardModule { }
