import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminLayoutComponent } from './pages/super-admin-layout/super-admin-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { SuperAdminCommissionComponent } from './pages/super-admin-commission/super-admin-commission.component';
import { DetailsComponent } from './pages/details/details.component';
@NgModule({
  declarations: [
    SuperAdminLayoutComponent,
   
    SuperAdminCommissionComponent,
        DetailsComponent,
   
    
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  exports:[
    NgModel
  ]
})
export class SuperAdminModule { }
