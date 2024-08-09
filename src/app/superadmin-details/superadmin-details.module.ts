import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminDetailsRoutingModule } from './superadmin-details-routing.module';
import { DetailsComponent } from './pages/details/details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SuperadminDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NgModel
  ]
  
})
export class SuperadminDetailsModule { }
