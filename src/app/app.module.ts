import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { HotToastModule } from '@ngneat/hot-toast';
import { IndexModule } from './index/index.module';
import { CoreModule } from './core/core.module';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { CustomerDashboardModule } from './Customer-Panel/customer-dashboard/customer-dashboard.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { NotificationModule } from '@progress/kendo-angular-notification';


// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,Ng2SearchPipeModule,
    
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    IndexModule,
    CoreModule,
    NgxBootstrapIconsModule,
    UserModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    CustomerDashboardModule,
    SuperAdminModule,
    NgxPermissionsModule.forRoot(),
    NotificationModule,
   
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
