import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { TopHeaderComponent } from './pages/top-header/top-header.component';
import { MainSectionComponent } from './pages/main-section/main-section.component';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TopHeaderComponent,
    MainSectionComponent,
    IndexLayoutComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class IndexModule { }
