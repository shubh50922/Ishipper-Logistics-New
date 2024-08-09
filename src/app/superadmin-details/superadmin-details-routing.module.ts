import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
const routes: Routes = [
  { path: '', component:DetailsComponent , canActivate:[AuthGuardGuard]},
  { path: 'details', component:DetailsComponent , canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminDetailsRoutingModule { }
