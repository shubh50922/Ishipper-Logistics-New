import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalInfoRoutingModule } from './additional-info-routing.module';
import { AdditionalDetailsComponent } from './additional-details/additional-details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdditionalDetailsComponent
  ],
  imports: [
    CommonModule,
    AdditionalInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdditionalInfoModule { }
