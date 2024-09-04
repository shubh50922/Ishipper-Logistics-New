import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './services/core.service';
import { LoaderComponent } from './loader/loader.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { InnerLoaderComponent } from './inner-loader/inner-loader.component';


@NgModule({
  declarations: [
  
    
  
    LoaderComponent,
    ProjectLayoutComponent,
    CustomerLayoutComponent,
    InnerLoaderComponent,
    
  
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule

  ],
  exports: [
    LoaderComponent,
    InnerLoaderComponent
    
  ]
})
export class CoreModule { }
