import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';

const routes: Routes = [
  {
    path: '',
    component: IndexLayoutComponent
  },
  {
    path: 'index',
    component: IndexLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
