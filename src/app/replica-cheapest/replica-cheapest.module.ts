import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplicaCheapestRoutingModule } from './replica-cheapest-routing.module';
import { PostmergequotesComponent } from './postmergequotes/postmergequotes.component';
import { LayoutComponent } from './layout/layout.component';
import { FastestComponent } from './fastest/fastest.component';
import { CourierNameComponent } from './courier-name/courier-name.component';
import { SamedayComponent } from './sameday/sameday.component';
import { CollectionTodayComponent } from './collection-today/collection-today.component';
import { ReplicaLayoutComponent } from './replica-layout/replica-layout.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PostmergequotesComponent,
    LayoutComponent,
    FastestComponent,
    CourierNameComponent,
    SamedayComponent,
    CollectionTodayComponent,
    ReplicaLayoutComponent
  ],
  imports: [
    CommonModule,
    ReplicaCheapestRoutingModule,
    MatTooltipModule
  ]
})
export class ReplicaCheapestModule { }
