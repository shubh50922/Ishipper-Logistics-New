import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module'; // Import CoreModule

import { UserRoutingModule } from './user-routing.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UserActivityComponent } from './pages/user-activity/user-activity.component';
import { CurrentUsersComponent } from './pages/current-users/current-users.component';
import { UserAdministrationComponent } from './pages/user-administration/user-administration.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AmmendUserComponent } from './pages/ammend-user/ammend-user.component';
import { TerminateUserComponent } from './pages/terminate-user/terminate-user.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdministrationLayoutComponent } from './layout/administration-layout/administration-layout.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserActivityComponent,
    CurrentUsersComponent,
    UserAdministrationComponent,
    AddUserComponent,
    AmmendUserComponent,
    TerminateUserComponent,
    UserLayoutComponent,
    AdministrationLayoutComponent,
    SearchPipe,
  ],
  imports: [

    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CoreModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule, 
    ToastrModule.forRoot(),
    
  ]
})
export class UserModule { }
