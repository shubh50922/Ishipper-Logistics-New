import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminDetailsRoutingModule } from './superadmin-details-routing.module';
import { DetailsComponent } from './pages/details/details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SuperadminDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    NgModel
  ]
  
})
export class SuperadminDetailsModule { }
