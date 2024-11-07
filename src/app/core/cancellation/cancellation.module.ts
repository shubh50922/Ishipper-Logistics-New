import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CancellationRoutingModule } from './cancellation-routing.module';
import { CancelPageComponent } from './cancel-page/cancel-page.component';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    CancelPageComponent,
    
  ],
  imports: [
    CommonModule,
    CancellationRoutingModule,
    ReactiveFormsModule,FormsModule,
    CoreModule
  ]
})
export class CancellationModule { }
