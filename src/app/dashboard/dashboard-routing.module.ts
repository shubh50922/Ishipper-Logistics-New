import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    pathMatch: 'full',
      canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
