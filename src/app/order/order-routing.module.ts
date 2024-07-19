import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
const routes: Routes = [{
  path:'',
  component:ViewOrderComponent,
  pathMatch: 'full',
  canActivate:[AuthGuardGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
