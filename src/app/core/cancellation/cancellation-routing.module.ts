import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelPageComponent } from './cancel-page/cancel-page.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: CancelPageComponent,
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancellationRoutingModule { }
