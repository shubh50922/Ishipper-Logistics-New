import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminLayoutComponent } from './pages/super-admin-layout/super-admin-layout.component';
import { SuperAdminFormComponent } from './pages/super-admin-form/super-admin-form.component';
import { SuperAdminTableComponent } from './pages/super-admin-table/super-admin-table.component';
import { SuperAdminEditComponent } from './pages/super-admin-edit/super-admin-edit.component';
import { SuperAdminDeleteComponent } from './pages/super-admin-delete/super-admin-delete.component';


@NgModule({
  declarations: [
    SuperAdminLayoutComponent,
    SuperAdminFormComponent,
    SuperAdminTableComponent,
    SuperAdminEditComponent,
    SuperAdminDeleteComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
