import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarrentyLayoutComponent } from './warrenty-layout/warrenty-layout.component';
import  { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { WarrentCard1Component } from './warrent-card1/warrent-card1.component';
import { WarrentCard2Component } from './warrent-card2/warrent-card2.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';

const routes: Routes = [
  {
    path:'',
    component:WarrentyLayoutComponent,
    pathMatch: 'full',
     canActivate:[AuthGuardGuard], 
     children:[
      { path: 'card1', component: WarrentCard1Component, canActivate:[AuthGuardGuard] },
      { path: 'card2', component:WarrentCard2Component, canActivate:[AuthGuardGuard] },
      { path: 'terms', component:TermConditionsComponent, canActivate:[AuthGuardGuard] },

     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarrentyInfoRoutingModule { }
