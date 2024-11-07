import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms'; // Only import ReactiveFormsModule if not using template-driven forms
import { CoreModule } from '../core/core.module';
import { ResetComponent } from './pages/reset/reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule, // Import only ReactiveFormsModule if not using template-driven forms
    CoreModule
  ]
})
export class AuthModule { }
