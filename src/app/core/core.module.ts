import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './services/core.service';
import { LoaderComponent } from './loader/loader.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { InnerLoaderComponent } from './inner-loader/inner-loader.component';
import { PayLoaderComponent } from './pay-loader/pay-loader.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TrackshipmentComponent } from './trackOrderUI/trackshipment/trackshipment.component';
import { DialogueboxComponent } from './dialoguebox/dialoguebox.component';



@NgModule({
  declarations: [
  
    
  
    LoaderComponent,
    ProjectLayoutComponent,
    CustomerLayoutComponent,
    InnerLoaderComponent,
    PayLoaderComponent,
    TrackshipmentComponent,
    DialogueboxComponent,
    
   
   
  
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule

  ],
  exports: [
    LoaderComponent,
    InnerLoaderComponent,
    PayLoaderComponent
    
  ]
})
export class CoreModule { }
