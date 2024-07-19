import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class CoreService {

  perm: string[] = []; 
  constructor(private http: HttpClientModule,private permissionsService : NgxPermissionsService) {}
  CheckPermission() {
    this.perm[0] = sessionStorage.getItem('role') || '';  // Ensure non-null string
    console.log("perm",this.perm);
    
    this.permissionsService.loadPermissions(this.perm);
  }
  clearToken(): void {
    console.log('token cleared');
    localStorage.removeItem('CompanyID');
    localStorage.removeItem('token');
  }
}
