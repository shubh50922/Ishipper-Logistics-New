import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarrentyInfoRoutingModule } from './warrenty-info-routing.module';
import { WarrentCard1Component } from './warrent-card1/warrent-card1.component';
import { WarrentCard2Component } from './warrent-card2/warrent-card2.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { WarrentyLayoutComponent } from './warrenty-layout/warrenty-layout.component';


@NgModule({
  declarations: [
    WarrentCard1Component,
    WarrentCard2Component,
    TermConditionsComponent,
    WarrentyLayoutComponent
  ],
  imports: [
    CommonModule,
    WarrentyInfoRoutingModule
  ]
})
export class WarrentyInfoModule { }
