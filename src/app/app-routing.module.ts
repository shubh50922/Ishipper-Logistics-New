import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLayoutComponent } from './core/layout/project-layout/project-layout.component';
import { ALL_ROUTES } from './core/routes/all-routes';



const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./index/index.module').then(m=>m.IndexModule)
  },
  
  {
    path:'auth',
    loadChildren: ()=>import ('./auth/auth.module').then(m=>m.AuthModule)
  },
  
  
{path:'application',
  component:ProjectLayoutComponent,
  children:ALL_ROUTES
 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
