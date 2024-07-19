import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierManagementComponent } from './pages/supplier-management/supplier-management.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path:'',
    component:SupplierManagementComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
