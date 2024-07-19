import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';


const routes: Routes = [
  {
    path:'',
    component:UserProfileComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardGuard]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
