import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryLayoutComponent } from './delivery-layout/delivery-layout.component';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { TopStriperComponent } from './top-striper/top-striper.component';
import { CollectionAdressComponent } from './collection-adress/collection-adress.component';
import { DeliveryAdressComponent } from './delivery-adress/delivery-adress.component';
import { ParcelDetailComponent } from './parcel-detail/parcel-detail.component';
const routes: Routes = [
  {
    path:'',
    component:DeliveryLayoutComponent,
    pathMatch: 'full',
     canActivate:[AuthGuardGuard],
     children:[
      { path: 'striper', component: TopStriperComponent, canActivate:[AuthGuardGuard] },
      { path: 'collectionaddress', component:CollectionAdressComponent, canActivate:[AuthGuardGuard] },
      { path: 'deliveryaddress', component:DeliveryAdressComponent, canActivate:[AuthGuardGuard] },
      { path: 'parceldetails', component: ParcelDetailComponent, canActivate:[AuthGuardGuard] },
      

     ]

  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryDetailRoutingModule { }
