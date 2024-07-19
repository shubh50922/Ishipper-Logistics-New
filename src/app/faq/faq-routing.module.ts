import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
const routes: Routes = [
  {
    path:'',
    component:FaqsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
