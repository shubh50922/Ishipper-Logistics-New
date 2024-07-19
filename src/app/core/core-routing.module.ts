import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { ProjectLayoutComponent} from './layout/project-layout/project-layout.component';
import { ALL_ROUTES } from './routes/all-routes';
import { USER_ROUTES } from './routes/user-routes';
const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
