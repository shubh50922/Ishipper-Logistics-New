import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,private authService:AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard canActivate called');
    const url: string = state.url;
    if (this.authService.isLoggedIn()) {
      console.log('User is logged in, allowing access');
      return true; // Allow access to the route
    } else {
      console.log('User is not logged in, redirecting to login');
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Block access to the route
    }
  }
  
}
 