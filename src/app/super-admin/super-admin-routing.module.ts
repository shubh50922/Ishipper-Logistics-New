import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './pages/super-admin-layout/super-admin-layout.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { SuperAdminCommissionComponent } from './pages/super-admin-commission/super-admin-commission.component';



const routes: Routes = [
  {
    path:'',
    component:SuperAdminLayoutComponent,
    pathMatch: 'full',
     canActivate:[AuthGuardGuard],
     children:[
      { path: 'commissiondata', component:SuperAdminCommissionComponent , canActivate:[AuthGuardGuard]}
     
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
