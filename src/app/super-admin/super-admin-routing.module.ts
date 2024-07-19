import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './pages/super-admin-layout/super-admin-layout.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { SuperAdminEditComponent } from './pages/super-admin-edit/super-admin-edit.component';
import { SuperAdminDeleteComponent } from './pages/super-admin-delete/super-admin-delete.component';
import { SuperAdminFormComponent } from './pages/super-admin-form/super-admin-form.component';
import { SuperAdminTableComponent } from './pages/super-admin-table/super-admin-table.component';

const routes: Routes = [
  {
    path:'',
    component:SuperAdminLayoutComponent,
    pathMatch: 'full',
     canActivate:[AuthGuardGuard],
     children:[
      {path:'edit',component:SuperAdminEditComponent, canActivate:[AuthGuardGuard]},
      { path: 'delete', component:SuperAdminDeleteComponent , canActivate:[AuthGuardGuard]},
      { path: 'form', component:SuperAdminFormComponent, canActivate:[AuthGuardGuard]},
      { path: 'table', component: SuperAdminTableComponent, canActivate:[AuthGuardGuard] },
      // { path: '', component:SuperAdminLayoutComponent , canActivate:[AuthGuardGuard]},
      // { path: '', redirectTo: 'form', pathMatch: 'full' }
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
