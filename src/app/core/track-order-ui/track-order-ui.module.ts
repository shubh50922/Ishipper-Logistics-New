import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TrackOrderUIRoutingModule } from './track-order-ui-routing.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TrackOrderUIRoutingModule,
    CoreModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class TrackOrderUIModule { }
