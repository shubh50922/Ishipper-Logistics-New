import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { CheapestServiceComponent } from './cheapest-service/cheapest-service.component';
import { FastestServiceComponent } from './fastest-service/fastest-service.component';
import { CollectionTodayComponent } from './collection-today/collection-today.component';
import { SamedayServiceComponent } from './sameday-service/sameday-service.component';
import { CarrierNameComponent } from './carrier-name/carrier-name.component';
const routes: Routes = [
  {
    path:'',
    component:DashboardLayoutComponent,
    
     canActivate:[AuthGuardGuard],
     children:[
      {path:'',component:CheapestServiceComponent, canActivate:[AuthGuardGuard]},
      { path: 'application/dashboardlayout/cheapest', component: CheapestServiceComponent , canActivate:[AuthGuardGuard]},
      { path: 'application/dashboardlayout/fastest', component:FastestServiceComponent , canActivate:[AuthGuardGuard]},
      { path: 'application/dashboardlayout/collection', component: CollectionTodayComponent, canActivate:[AuthGuardGuard] },
      { path: 'application/dashboardlayout/sameday', component: SamedayServiceComponent , canActivate:[AuthGuardGuard]},
      { path: 'application/dashboardlayout/carriername', component:CarrierNameComponent , canActivate:[AuthGuardGuard] },
      // { path: '', redirectTo: 'cheapest', pathMatch: 'full' }
     ]
  },


// { path: '**', redirectTo: '', pathMatch: 'full' }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
