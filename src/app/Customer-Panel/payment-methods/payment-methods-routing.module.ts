import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path:'',
    component:CardComponent,
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
export class PaymentMethodsRoutingModule { }
