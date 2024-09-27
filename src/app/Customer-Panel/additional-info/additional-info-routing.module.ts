import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalDetailsComponent } from './additional-details/additional-details.component';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
const routes: Routes = [
  {
    path:'',
    component:AdditionalDetailsComponent,
    pathMatch: 'full',
     canActivate:[AuthGuardGuard],
    //  children:[
    //   { path: 'striper', component: TopStriperComponent, canActivate:[AuthGuardGuard] },
    //   { path: 'collectionaddress', component:CollectionAdressComponent, canActivate:[AuthGuardGuard] },
    //   { path: 'deliveryaddress', component:DeliveryAdressComponent, canActivate:[AuthGuardGuard] },
    //   { path: 'parceldetails', component: ParcelDetailComponent, canActivate:[AuthGuardGuard] },
      

    //  ]

  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalInfoRoutingModule { }
