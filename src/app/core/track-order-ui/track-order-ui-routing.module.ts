import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackshipmentComponent } from '../trackOrderUI/trackshipment/trackshipment.component';

const routes: Routes = [
  {
    path: '',
    component: TrackshipmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackOrderUIRoutingModule { }
