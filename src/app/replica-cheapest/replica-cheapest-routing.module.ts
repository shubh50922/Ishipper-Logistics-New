import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostmergequotesComponent } from './postmergequotes/postmergequotes.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { FastestComponent } from './fastest/fastest.component';
import { CollectionTodayComponent } from './collection-today/collection-today.component';
import { SamedayComponent } from './sameday/sameday.component';
import { ReplicaLayoutComponent } from './replica-layout/replica-layout.component';
import { CourierNameComponent } from './courier-name/courier-name.component';
const routes: Routes = [{
  path:'',
  component:ReplicaLayoutComponent,
  
   canActivate:[AuthGuardGuard],
   children: [
  
  {path:'',component:PostmergequotesComponent,canActivate:[AuthGuardGuard]},
  {path:'application/replica/post',component:PostmergequotesComponent,canActivate:[AuthGuardGuard]},
  {path:'application/replica/fastestservice',component:FastestComponent,canActivate:[AuthGuardGuard]},
  {path:'application/replica/collectiontoday',component: CollectionTodayComponent,canActivate:[AuthGuardGuard]},
  {path:'application/replica/samedayservice',component:SamedayComponent,canActivate:[AuthGuardGuard]},
  {path:'application/replica/name',component:CourierNameComponent,canActivate:[AuthGuardGuard]}
]
}, 
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplicaCheapestRoutingModule { }
