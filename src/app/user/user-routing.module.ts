import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserActivityComponent } from './pages/user-activity/user-activity.component';
import { CurrentUsersComponent } from './pages/current-users/current-users.component';
import { UserAdministrationComponent } from './pages/user-administration/user-administration.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AmmendUserComponent } from './pages/ammend-user/ammend-user.component';
import { TerminateUserComponent } from './pages/terminate-user/terminate-user.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      { path: 'useractivity', component: UserActivityComponent, canActivate:[AuthGuardGuard] },
      { path: 'currentusers', component: CurrentUsersComponent, canActivate:[AuthGuardGuard] },
      { path: '', redirectTo: 'useractivity', pathMatch: 'full' },
      { 
        path: 'useradministration', 
        component: UserAdministrationComponent,
        children: [
          { path: 'adduser', component: AddUserComponent, canActivate:[AuthGuardGuard] },
          { path: 'ammenduser/:userID', component: AmmendUserComponent, canActivate:[AuthGuardGuard] },
          { path: 'ammenduser', component: AmmendUserComponent, canActivate:[AuthGuardGuard] },
          { path: 'terminateuser', component: TerminateUserComponent , canActivate:[AuthGuardGuard]},
          { path: '', redirectTo: 'adduser', pathMatch: 'full' }
        ]
      },
      
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
