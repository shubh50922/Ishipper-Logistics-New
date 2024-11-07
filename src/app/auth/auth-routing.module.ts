import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetComponent } from './pages/reset/reset.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirect empty path to login
    pathMatch: 'full'
  },
  {
    path:'login',
    component : LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'forgot',
    component : ForgotPasswordComponent
  },
  { path: 'reset/resetpassword', component: ResetComponent },
 
  // {
  //   path: '**', // Wildcard route to catch unmatched paths
  //   redirectTo: 'login'
  // }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
